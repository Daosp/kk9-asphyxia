const profileRoot = document.querySelector('#profile-customization');
const customForm = document.querySelector('#custom-settings');
const profileStatus = document.querySelector('#profile-selection-status');
const saveButton = customForm.querySelector('button[type="submit"]');
const customIdInput = customForm.querySelector('#customize-custom-id');
const customIdValue = customForm.querySelector('#customize-value-custom-id');
const tableRows = Array.from(document.querySelectorAll('[data-customize-row="table"]'));
const medalSlots = Array.from(document.querySelectorAll('[data-medal-slot]'));
const medalChoices = Array.from(document.querySelectorAll('[data-medal-choice]'));
const tablePageSize = 8;
const defaults = {
  table: '6000000',
  hai: '5000000',
  base: '1000000',
  corner: '2000000',
  midle: '3000000'
};
let tablePage = 0;
let activeMedalSlot = 0;
const selectedMedals = medalSlots.map(slot => slot.dataset.medalId || '');

const getButtons = key => document.querySelectorAll(`[data-customize-select="${key}"]`);

const updatePreview = (key, id, image) => {
  if (key === 'table') {
    document.querySelector('#customize-preview-table').src = image;
    return;
  }

  if (key === 'hai') {
    document.querySelector('#customize-preview-hai').src = image;
    return;
  }

  if (key === 'base') {
    document.querySelector('.panel-center').src = image;
    return;
  }

  const isCorner = key === 'corner';
  const folder = isCorner ? 'corner' : 'midle';
  const imageClass = isCorner ? 'panel-corner' : 'panel-side';
  for (let segment = 1; segment <= 4; segment++) {
    document.querySelector(`.${imageClass}${segment}`).src =
      `static/img/panel/${folder}/${id}_num${segment}.webp`;
  }
};

const setSelection = (button, updateStatus = true) => {
  const { customizeSelect: key, itemId: id, itemImage: image } = button.dataset;
  const value = customForm.querySelector(`#customize-value-${key}`);
  if (!value || !id) return;

  value.value = id;
  getButtons(key).forEach(item => {
    const isSelected = item === button;
    item.setAttribute('aria-pressed', String(isSelected));
    item.textContent = isSelected ? 'Previewing' : 'Preview';
  });
  updatePreview(key, id, image);
  if (updateStatus) customForm.dataset.changed = 'true';
};

const renderTablePage = () => {
  const pageCount = Math.max(1, Math.ceil(tableRows.length / tablePageSize));
  tablePage = Math.max(0, Math.min(tablePage, pageCount - 1));
  tableRows.forEach((row, index) => {
    row.hidden = index < tablePage * tablePageSize || index >= (tablePage + 1) * tablePageSize;
  });

  document.querySelector('[data-page-status]').textContent = `Page ${tablePage + 1} of ${pageCount}`;
  document.querySelector('[data-page-prev]').disabled = tablePage === 0;
  document.querySelector('[data-page-next]').disabled = tablePage === pageCount - 1;
};

const renderMedals = () => {
  medalSlots.forEach((slot, index) => {
    const medalId = selectedMedals[index];
    slot.dataset.medalId = medalId;
    slot.querySelector('[data-medal-slot-select]').setAttribute('aria-pressed', String(index === activeMedalSlot));
    slot.querySelector('[data-medal-clear]').disabled = !medalId;
    const image = slot.querySelector('[data-medal-slot-image]');
    image.hidden = !medalId;
    if (medalId) {
      image.src = `static/img/medals/${medalId}.webp`;
      image.alt = `Medal ${medalId}`;
    }
    slot.querySelector('[data-medal-slot-label]').textContent = medalId ? `Medal ${medalId}` : 'Empty';

    const preview = document.querySelector(`[data-medal-preview="${index}"]`);
    preview.hidden = !medalId;
    if (medalId) {
      preview.src = `static/img/medals/${medalId}.webp`;
      preview.alt = `Medal ${medalId}`;
    }
  });

  medalChoices.forEach(choice => {
    choice.setAttribute('aria-pressed', String(selectedMedals.includes(choice.dataset.medalChoice)));
  });
  document.querySelector('#customize-medal-status').textContent = `Slot ${activeMedalSlot + 1} selected`;
};

document.querySelectorAll('[data-customize-tab]').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('[data-customize-tab]').forEach(item => {
      const selected = item === tab;
      item.classList.toggle('is-active', selected);
      item.setAttribute('aria-selected', String(selected));
    });
    document.querySelectorAll('[data-customize-panel]').forEach(panel => {
      panel.hidden = panel.dataset.customizePanel !== tab.dataset.customizeTab;
    });
  });
});

document.querySelectorAll('[data-customize-select]').forEach(button => {
  button.addEventListener('click', () => setSelection(button));
});

medalSlots.forEach(slot => {
  slot.querySelector('[data-medal-slot-select]').addEventListener('click', () => {
    activeMedalSlot = Number(slot.dataset.medalSlot);
    renderMedals();
  });
  slot.querySelector('[data-medal-clear]').addEventListener('click', () => {
    activeMedalSlot = Number(slot.dataset.medalSlot);
    selectedMedals[activeMedalSlot] = '';
    renderMedals();
    customForm.dataset.changed = 'true';
  });
});

medalChoices.forEach(choice => {
  choice.addEventListener('click', () => {
    selectedMedals[activeMedalSlot] = choice.dataset.medalChoice;
    renderMedals();
    customForm.dataset.changed = 'true';
  });
});

document.querySelector('[data-page-prev]').addEventListener('click', () => {
  tablePage--;
  renderTablePage();
});

document.querySelector('[data-page-next]').addEventListener('click', () => {
  tablePage++;
  renderTablePage();
});

document.querySelector('#customize-reset').addEventListener('click', () => {
  Object.entries(defaults).forEach(([key, id]) => {
    const defaultButton = document.querySelector(`[data-customize-select="${key}"][data-item-id="${id}"]`);
    if (defaultButton) setSelection(defaultButton, false);
  });
  customIdInput.value = '1';
  customIdValue.value = '1';
  selectedMedals.fill('');
  activeMedalSlot = 0;
  renderMedals();
  tablePage = 0;
  renderTablePage();
  customForm.dataset.changed = 'true';
});

customIdInput.addEventListener('input', () => {
  customIdValue.value = customIdInput.value;
});

customForm.addEventListener('submit', async event => {
  event.preventDefault();
  const customId = Number(customIdInput.value);
  if (!Number.isSafeInteger(customId) || customId < 1) {
    customIdInput.reportValidity();
    return;
  }

  const settings = Object.fromEntries(new FormData(customForm).entries());
  settings.customId = customId;
  saveButton.disabled = true;
  document.querySelector('#custom-save-status').textContent = 'Saving...';
  try {
    await emit('custom-update', settings);
    document.querySelector('#custom-save-status').textContent = 'Customization saved';
    customForm.dataset.changed = 'false';
  } catch (error) {
    document.querySelector('#custom-save-status').textContent =
      `Failed to save customization: ${error instanceof Error ? error.message : String(error)}`;
  } finally {
    saveButton.disabled = false;
  }
});

renderTablePage();
renderMedals();
document.querySelectorAll('[data-customize-select][aria-pressed="true"]').forEach(button => {
  setSelection(button, false);
});

const pageRefid = profileRoot.dataset.profileRefid;
if (pageRefid) {
  customForm.elements.refid.value = pageRefid;
  profileStatus.textContent = 'Editing the selected Asphyxia profile';
  saveButton.disabled = false;
} else {
  profileStatus.textContent = 'No Asphyxia profile is selected';
  profileStatus.setAttribute('aria-invalid', 'true');
}
