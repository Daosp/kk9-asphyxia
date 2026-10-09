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
  $('#shop-save-status').text('Saving...');
  emit('shop-update', shop).then(() => {
    $('#shop-save-status').text('Shop saved');
  }).catch(() => {
    $('#shop-save-status').text('No save');
  });
});

$('#custom-settings').on('submit', event => {
  event.preventDefault();
  const custom = Object.fromEntries(new FormData(event.currentTarget).entries());
  $('#custom-save-status').text('Saving...');
  emit('custom-update', custom).then(() => {
    $('#custom-save-status').text('Customization saved');
  }).catch(() => {
    $('#custom-save-status').text('No save');
  });
});
