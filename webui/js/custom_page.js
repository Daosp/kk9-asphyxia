$('#plugin-click').on('click', () => {
  emit('click').then(() => {
    location.reload();
  });
});

$('#plugin-random').on('click', () => {
  emit('random').then(result => {
    $('#random-number').text(result.data.number);
  });
});

$('#shop-settings').on('submit', event => {
  event.preventDefault();
  const shop = Object.fromEntries(new FormData(event.currentTarget).entries());
  $('#shop-save-status').text('Сохранение...');
  emit('shop-update', shop).then(() => {
    $('#shop-save-status').text('Настройки магазина сохранены');
  }).catch(() => {
    $('#shop-save-status').text('Не удалось сохранить настройки');
  });
});
