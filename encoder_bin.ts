import { pdata_data } from "./model/bd_types_profile";

export async function DB_BIN_to_XML(data_id?: string | null) {
    console.log('DB_BIN_to_XML: START');
    var dataId: string | null = "";
    if(data_id == undefined) dataId = null; else dataId = data_id;
    const records = await DB.Find<pdata_data>(dataId,{collection: "pdata_data"});
    if (_.isNil(records)) {
      console.warn('DB_BIN_to_XML: DONT HAVE RECORD');
      return
    };

    var lengthDataNodes = records.length;
    console.log("DB_BIN_to_XML: Num of nodes: ".concat(lengthDataNodes.toString()));

    //const node = "15";
    for (const rec of records) {
        //if(rec.node_id != node) continue;
        const buffer = Buffer.from(rec.content, 'hex');
        KBINtoXML(buffer, rec.__refid, rec.node_id);
        console.log('DB_BIN_to_XML: Node ID'.concat(rec.node_id).concat(" added"));
        //if(rec.node_id == node) break;
    };
    console.log('DB_BIN_to_XML: END');
}


export async function KBINtoXML(buffer: Buffer, data_id, node_id: string) {

  let parsed: {
    xml: string,
    offset: number
  } = {
    xml: "",
    offset: 0
  };
  let sizeBuffer: number = buffer.length - 3;
  
  console.log('DB_BIN_to_XML: Node ID'+node_id+' Buffer size:'+sizeBuffer);

  parsed = parsePacket(buffer.slice(0));
  console.log('DB_BIN_to_XML: Node ID'+node_id+' XML: ' + parsed.xml.slice(0,16)+"...");
  


  IO.WriteFile('./userdata_xml/'+data_id+'__'+node_id+'.xml',parsed.xml);
  console.log('DB_BIN_to_XML: XML сохранён в ./userdata_xml/'+data_id+'__'+node_id+'.xml');
}

// ---------------------------------------------------------------------------
// Типы
// ---------------------------------------------------------------------------
interface SchemaNode {
  type: number;                 // базовый тип (без флага массива)
  name: string;
  attributes: Record<string, string>;
  children: SchemaNode[];
}

// ---------------------------------------------------------------------------
// Вспомогательные константы
// ---------------------------------------------------------------------------
const ALPHABET = '0123456789:ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz';

// Таблица соответствия типов и их строковых имён для XML
const TYPE_NAMES: Record<number, string> = {
  0x01: 'void',
  0x02: 's8',
  0x03: 'u8',
  0x04: 's16',
  0x05: 'u16',
  0x06: 's32',
  0x07: 'u32',
  0x08: 's64',
  0x09: 'u64',
  0x0a: 'bin',
  0x0b: 'str',
  0x0c: 'ip4',
  0x0d: 'time',
  0x0e: 'float',
  0x0f: 'double',
  0x10: '2s8',
  0x11: '2u8',
  0x12: '2s16',
  0x13: '2u16',
  0x14: '2s32',
  0x15: '2u32',
  0x16: '2s64',
  0x17: '2u64',
  0x18: '2f',
  0x19: '2d',
  0x1a: '3s8',
  0x1b: '3u8',
  0x1c: '3s16',
  0x1d: '3u16',
  0x1e: '3s32',
  0x1f: '3u32',
  0x20: '3s64',
  0x21: '3u64',
  0x22: '3f',
  0x23: '3d',
  0x24: '4s8',
  0x25: '4u8',
  0x26: '4s16',
  0x27: '4u16',
  0x28: '4s32',
  0x29: '4u32',
  0x2a: '4s64',
  0x2b: '4u64',
  0x2c: '4f',
  0x2d: '4d',
  0x2e: 'attr',
  0x2f: 'array',
  0x34: 'bool',
  0x35: '2b',
  0x36: '3b',
  0x37: '4b',
  0x38: 'vb',
  0x39: '3s8',
  0x3a: '3u8',
  0x3b: '3s16',
  0x3c: '3u16',
  0x3d: '3s32',
  0x3e: '3u32',
  0x3f: '3s64',
};

// ---------------------------------------------------------------------------
// Чтение HEX-строки
// ---------------------------------------------------------------------------
function parseHex(hex: string): Buffer {
  const clean = hex.replace(/\s/g, '');
  return Buffer.from(clean, 'hex');
}

// ---------------------------------------------------------------------------
// Чтение имени (packed или full)
// ---------------------------------------------------------------------------
function readName(
  buffer: Buffer,
  offset: number,
  content: number
): { name: string; offset: number } {
  // Packed names (content 0x42/0x43)
  if (content === 0x42 || content === 0x43) {
    const nlen = buffer.readUInt8(offset);
    offset += 1;
    const packedLength = Math.ceil((nlen * 6) / 8);
    const packedBytes = buffer.slice(offset, offset + packedLength);
    offset += packedLength;

    let name = '';
    let bitBuffer = 0;
    let bitsInBuffer = 0;
    for (const byte of packedBytes) {
      bitBuffer = (bitBuffer << 8) | byte;
      bitsInBuffer += 8;
      while (bitsInBuffer >= 6 && name.length < nlen) {
        const index = (bitBuffer >> (bitsInBuffer - 6)) & 0x3f;
        name += ALPHABET[index];
        bitsInBuffer -= 6;
      }
    }
    return { name, offset };
  }

  // Full names (content 0x45/0x46)
  let length = buffer.readUInt8(offset);
  offset += 1;
  if (length > 0x7f) {
    const second = buffer.readUInt8(offset);
    offset += 1;
    length = ((length & 0x7f) << 8) | second;
  }
  const name = buffer.toString('utf8', offset, offset + length);
  offset += length;
  return { name, offset };
}

// ---------------------------------------------------------------------------
// Чтение схемы
// ---------------------------------------------------------------------------
function readSchema(
  buffer: Buffer,
  offset: number,
  content: number
): { node: SchemaNode | null; offset: number } {
  
  if (offset >= buffer.length) return { node: null, offset };

  const typeByte = buffer.readUInt8(offset);
  if (typeByte === 0xfe) {
    // Конец списка детей
    return { node: null, offset: offset + 1 };
  }
  offset += 1;

  const isArray = (typeByte & 0x40) !== 0;
  const baseType = typeByte & 0x3f;

  const { name, offset: nameEnd } = readName(buffer, offset, content);
  offset = nameEnd;

  const node: SchemaNode = {
    type: isArray ? baseType | 0x40 : baseType,
    name,
    attributes: {},
    children: [],
  };

  // Читаем атрибуты и дочерние узлы до 0xFE
  while (true) {
    const childTypeByte = buffer.readUInt8(offset);
    if (childTypeByte === 0xfe) {
      offset += 1;
      break;
    }
    if (childTypeByte === 0x2e) {
      // Атрибут
      offset += 1;
      const { name: attrName, offset: attrEnd } = readName(buffer, offset, content);
      offset = attrEnd;
      node.attributes[attrName] = ''; // значение будет заполнено при чтении данных
    } else {
      // Дочерний тег
      const { node: child, offset: childEnd } = readSchema(buffer, offset, content);
      if (child) node.children.push(child);
      offset = childEnd;
    }
  }

  return { node, offset };
}

// ---------------------------------------------------------------------------
// Чтение данных для узла
// ---------------------------------------------------------------------------
function readData(
  buffer: Buffer,
  offset: number,
  node: SchemaNode,
  encoding: number
): { value: any; offset: number } {
  const type = node.type;
  const isArray = (type & 0x40) !== 0;
  const baseType = type & 0x3f;

  let value: any;

  if (isArray) {
    if (offset + 4 > buffer.length) {
      throw new Error(`readData: array len out of bounds at ${offset}`);
    }
    const length = buffer.readUInt32BE(offset);
    offset += 4;
    const values: any[] = [];
    for (let i = 0; i < length; i++) {
      const { value: elem, offset: next } = readData(
        buffer,
        offset,
        { ...node, type: baseType },
        encoding
      );
      values.push(elem);
      offset = next;
    }
    return { value: values, offset };
  }

  const need = (n: number) => {
    if (offset + n > buffer.length) {
      throw new Error(
        `readData: OOB at ${offset}, need ${n}, have ${buffer.length - offset}, type=0x${baseType.toString(16)}`
      );
    }
  };

  switch (baseType) {
    // ---------- скаляры ----------
    case 0x01: value = null; break;                                       // void
    case 0x02: need(1); value = buffer.readInt8(offset);       offset += 1; break;
    case 0x03: need(1); value = buffer.readUInt8(offset);      offset += 1; break;
    case 0x04: need(2); value = buffer.readInt16BE(offset);    offset += 2; break;
    case 0x05: need(2); value = buffer.readUInt16BE(offset);   offset += 2; break;
    case 0x06: need(4); value = buffer.readInt32BE(offset);    offset += 4; break;
    case 0x07: need(4); value = buffer.readUInt32BE(offset);   offset += 4; break;
    case 0x08: need(8); value = buffer.readBigInt64BE(offset); offset += 8; break;
    case 0x09: need(8); value = buffer.readBigUInt64BE(offset);offset += 8; break;
    case 0x0a: { // bin
      need(4);
      offset = (offset + 3) & ~3;
      const len = buffer.readUInt32BE(offset); offset += 4;
      need(len);
      value = buffer.slice(offset, offset + len);
      offset += len;
      offset = (offset + 3) & ~3;
      break;
    }
    case 0x0b: { // str
      need(4);
      offset = (offset + 3) & ~3;
      const len = buffer.readUInt32BE(offset); offset += 4;
      need(len);
      value = decodeString(buffer.slice(offset, offset + len), encoding);
      offset += len;
      offset = (offset + 3) & ~3;
      break;
    }
    case 0x0c: need(4); value = buffer.readUInt32BE(offset); offset += 4; break; // ip4
    case 0x0d: need(4); value = buffer.readUInt32BE(offset); offset += 4; break; // time
    case 0x0e: need(4); value = buffer.readFloatBE(offset);  offset += 4; break;
    case 0x0f: need(8); value = buffer.readDoubleBE(offset); offset += 8; break;

    // ---------- 2-элементные ----------
    case 0x10: need(2);  value = [buffer.readInt8 (offset), buffer.readInt8 (offset+1)]; offset += 2;  break; // 2s8
    case 0x11: need(2);  value = [buffer.readUInt8(offset), buffer.readUInt8(offset+1)]; offset += 2;  break; // 2u8
    case 0x12: need(4);  value = [buffer.readInt16BE(offset), buffer.readInt16BE(offset+2)]; offset += 4;  break; // 2s16
    case 0x13: need(4);  value = [buffer.readUInt16BE(offset),buffer.readUInt16BE(offset+2)];offset += 4;  break; // 2u16
    case 0x14: need(8);  value = [buffer.readInt32BE(offset), buffer.readInt32BE(offset+4)]; offset += 8;  break; // 2s32
    case 0x15: need(8);  value = [buffer.readUInt32BE(offset),buffer.readUInt32BE(offset+4)];offset += 8;  break; // 2u32
    case 0x16: need(16); value = [buffer.readBigInt64BE(offset), buffer.readBigInt64BE(offset+8)];  offset += 16; break;
    case 0x17: need(16); value = [buffer.readBigUInt64BE(offset), buffer.readBigUInt64BE(offset+8)]; offset += 16; break;
    case 0x18: need(8);  value = [buffer.readFloatBE(offset), buffer.readFloatBE(offset+4)]; offset += 8;  break; // 2f
    case 0x19: need(16); value = [buffer.readDoubleBE(offset),buffer.readDoubleBE(offset+8)];offset += 16; break; // 2d

    // ---------- 3-элементные ----------
    case 0x1a: need(3);  value = [buffer.readInt8 (offset), buffer.readInt8 (offset+1), buffer.readInt8 (offset+2)]; offset += 3;  break; // 3s8
    case 0x1b: need(3);  value = [buffer.readUInt8(offset), buffer.readUInt8(offset+1), buffer.readUInt8(offset+2)]; offset += 3;  break; // 3u8
    case 0x1c: need(6);  value = [buffer.readInt16BE(offset), buffer.readInt16BE(offset+2), buffer.readInt16BE(offset+4)]; offset += 6;  break; // 3s16
    case 0x1d: need(6);  value = [buffer.readUInt16BE(offset),buffer.readUInt16BE(offset+2),buffer.readUInt16BE(offset+4)];offset += 6;  break; // 3u16
    case 0x1e: need(12); value = [buffer.readInt32BE(offset), buffer.readInt32BE(offset+4), buffer.readInt32BE(offset+8)]; offset += 12; break; // 3s32
    case 0x1f: need(12); value = [buffer.readUInt32BE(offset),buffer.readUInt32BE(offset+4),buffer.readUInt32BE(offset+8)];offset += 12; break; // 3u32
    case 0x20: need(24); offset += 24; value = null; break; // 3s64
    case 0x21: need(24); offset += 24; value = null; break; // 3u64
    case 0x22: need(12); offset += 12; value = null; break; // 3f
    case 0x23: need(24); offset += 24; value = null; break; // 3d

    // ---------- 4-элементные ----------
    case 0x24: need(4);  offset += 4;  value = null; break; // 4s8
    case 0x25: need(4);  offset += 4;  value = null; break; // 4u8
    case 0x26: need(8);  offset += 8;  value = null; break; // 4s16
    case 0x27: need(8);  offset += 8;  value = null; break; // 4u16
    case 0x28: need(16); offset += 16; value = null; break; // 4s32
    case 0x29: need(16); offset += 16; value = null; break; // 4u32
    case 0x2a: need(32); offset += 32; value = null; break; // 4s64
    case 0x2b: need(32); offset += 32; value = null; break; // 4u64
    case 0x2c: need(16); offset += 16; value = null; break; // 4f
    case 0x2d: need(32); offset += 32; value = null; break; // 4d

    // 0x2e — attr: только в схеме, данных в потоке нет
    // 0x2f — array: уже обработано выше через isArray

    // ---------- bool-типы ----------
    case 0x34: need(1); value = buffer.readUInt8(offset) !== 0; offset += 1; break;
    case 0x35: need(2); offset += 2; value = null; break; // 2b
    case 0x36: need(3); offset += 3; value = null; break; // 3b
    case 0x37: need(4); offset += 4; value = null; break; // 4b
    case 0x38: { // vb — переменная длина: 4-байтовый размер + N байт (по байту на bool)
      need(4);
      const vbLen = buffer.readUInt32BE(offset); offset += 4;
      need(vbLen);
      value = Array.from(buffer.slice(offset, offset + vbLen)).map(b => b !== 0);
      offset += vbLen;
      break;
    }

    // ---------- дубликаты из вашей таблицы ----------
    case 0x39: need(3);  offset += 3;  value = null; break;
    case 0x3a: need(3);  offset += 3;  value = null; break;
    case 0x3b: need(6);  offset += 6;  value = null; break;
    case 0x3c: need(6);  offset += 6;  value = null; break;
    case 0x3d: need(12); offset += 12; value = null; break;
    case 0x3e: need(12); offset += 12; value = null; break;
    case 0x3f: need(24); offset += 24; value = null; break;

    default:
      //console.warn(`readData: неизвестный тип 0x${baseType.toString(16)} @ ${offset}`);
      // НЕ оставляем offset без изменений — иначе всё поедет.
      // Но и не знаем, сколько байт пропустить. Поэтому кидаем исключение,
      // чтобы точно знать, где именно оно рвётся:
      throw new Error(`readData: неизвестный тип 0x${baseType.toString(16)} @ ${offset}`);
}

  // Дочерние узлы (после скаляра)
  if (node.children.length > 0) {
    const childValues: Record<string, any> = {};
    for (const child of node.children) {
      const { value: childVal, offset: childEnd } = readData(buffer, offset, child, encoding);
      childValues[child.name] = childVal;
      offset = childEnd;
    }
    value = childValues;
  }

  return { value, offset };
}

// ---------------------------------------------------------------------------
// Декодирование строки в соответствии с кодировкой пакета
// ---------------------------------------------------------------------------
function decodeString(buffer: Buffer, encoding: number): string {
  switch (encoding) {
    case 0x00:
    case 0x40:
      return buffer.toString('latin1'); // ISO-8859-1
    case 0x20:
      return buffer.toString('ascii');
    case 0x60:
      return U.DecodeString(buffer,"euc-jp");
    case 0x80:
      return U.DecodeString(buffer,"shift_jis");
    case 0xa0:
      return buffer.toString('utf8');
    default:
      return buffer.toString('utf8');
  }
}

// ---------------------------------------------------------------------------
// Генерация XML
// ---------------------------------------------------------------------------
function generateXml(node: SchemaNode, value: any): string {
  const attrs = Object.keys(node.attributes)
    .map((attr) => `${attr}="${TYPE_NAMES[node.type & 0x3f] || 'unknown'}"`)
    .join(' ');
  const attrStr = attrs ? ` ${attrs}` : '';

  if (node.children.length > 0) {
    let inner = '';
    for (const child of node.children) {
      const childVal = value ? value[child.name] : undefined;
      inner += generateXml(child, childVal);
    }
    return `<${node.name}${attrStr}>${inner}</${node.name}>`;
  }

  const text = value !== undefined && value !== null ? String(value) : '';
  return `<${node.name}${attrStr}>${text}</${node.name}>`;
}

// ---------------------------------------------------------------------------
// Парсинг одного пакета
// ---------------------------------------------------------------------------
function parsePacket(buffer: Buffer): { xml: string; offset: number } {
  const magic = buffer.readUInt8(0);
  if (magic !== 0xa0) throw new Error('Неверный магический байт');

  const content = buffer.readUInt8(1);
  const encoding = buffer.readUInt8(2);
  const encodingComplement = buffer.readUInt8(3);
  if ((encoding ^ 0xff) !== encodingComplement) {
    throw new Error('Неверное дополнение кодировки');
  }

  const schemaLength = buffer.readUInt32BE(4);
  const schemaEndFromHeader = 8 + schemaLength;
  //console.log(`[parsePacket] schemaLength(header)=${schemaLength}`);
  //console.log(`[parsePacket] schemaEndFromHeader=${schemaEndFromHeader}`);
  //console.log(`[parsePacket] buffer.length=${buffer.length}`);

  let offset = 8;
  const { node: root, offset: schemaEndParsed } = readSchema(buffer, offset, content);
  // После readSchema:
  if (schemaEndParsed !== schemaEndFromHeader) {
    console.warn(`SCHEMA MISMATCH: parsed=${schemaEndParsed}, header=${schemaEndFromHeader}`);
  }
  // Принудительно доверяем заголовку:
  offset = schemaEndFromHeader;
  //console.log(`[parsePacket] schemaEndParsed=${schemaEndParsed}`);
  //console.log(`[parsePacket] delta(schemaEndParsed - schemaEndFromHeader)=${schemaEndParsed - schemaEndFromHeader}`);
  offset = schemaEndParsed;

  const bAfterSchema = buffer.readUInt8(offset);
  //console.log(`[parsePacket] byte@schemaEnd = 0x${bAfterSchema.toString(16)}`);
  if (bAfterSchema !== 0xff) {
    console.warn('Ожидался байт 0xFF после схемы');
  } else {
    offset += 1;
  }

  //console.log(`[parsePacket] before align = ${offset}`);
  offset = (offset + 3) & ~3;
  //console.log(`[parsePacket] after align  = ${offset}`);

  //const dataLength = buffer.readUInt32BE(offset);
  //console.log(`[parsePacket] dataLength = ${dataLength}, bytes@pos = ${buffer.slice(offset, offset + 4).toString('hex')}`);
  offset += 4;

  //console.log(`[parsePacket] dataStart = ${offset}, first 32 bytes: ${buffer.slice(offset, offset + 32).toString('hex')}`);

  const { value: dataValue, offset: dataEnd } = readData(buffer, offset, root!, encoding);
  //console.log(`[parsePacket] dataEnd = ${dataEnd}, consumed = ${dataEnd - offset} (expected ~ ${dataLength})`);

  const xml = generateXml(root!, dataValue);
  return { xml, offset: dataEnd };
}