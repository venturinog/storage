/* Storage: diálogos con el modal BS5 del tema (antes jQuery facebox). */
deviceToFormat   = '';
deviceToUnmount  = '';
deviceToMount    = '';

function issStorageOpen(sel) {
    var store = document.getElementById('issStorageDialogs');
    var body  = document.getElementById('issStorageModalBody');
    var src   = document.querySelector(sel);
    if (!store || !body || !src) return;

    /* Devolver al store lo que quedó del diálogo anterior */
    while (body.firstChild) store.appendChild(body.firstChild);
    body.appendChild(src);

    var dev = deviceToFormat || deviceToUnmount || deviceToMount;
    var headerEl = body.querySelector('[name=fheader]');
    document.getElementById('issStorageModalTitle').textContent =
        (headerEl ? headerEl.value : '') + (dev ? ' ' + dev : '');

    var modalEl = document.getElementById('issStorageModal');
    if (window.bootstrap && bootstrap.Modal) {
        bootstrap.Modal.getOrCreateInstance(modalEl).show();
    } else {
        modalEl.classList.add('show');
        modalEl.style.display = 'block';
    }
}

function issStorageClose() {
    var modalEl = document.getElementById('issStorageModal');
    if (window.bootstrap && bootstrap.Modal) {
        var inst = bootstrap.Modal.getInstance(modalEl);
        if (inst) inst.hide();
    } else {
        modalEl.classList.remove('show');
        modalEl.style.display = 'none';
    }
    deviceToFormat  = '';
    deviceToMount   = '';
    deviceToUnmount = '';
}

function showFormat(dev) {
    deviceToFormat=dev;
    deviceToUnmount='';
    deviceToMount='';
    issStorageOpen('#formatdialog');
}

function showUmount(dev) {
    deviceToFormat='';
    deviceToMount='';
    deviceToUnmount=dev;
    issStorageOpen('#umountdialog');
}

function showMount(dev) {
    deviceToFormat='';
    deviceToUnmount='';
    deviceToMount=dev;
    issStorageOpen('#mountdialog');
}

function issStorageSubmit(action) {
    var body = document.getElementById('issStorageModalBody');
    var dev = deviceToFormat || deviceToUnmount || deviceToMount;
    if (!body || dev == '') { issStorageClose(); return; }

    var format = body.querySelector('#format');
    var formatValue = format ? format.value : null;

    issStorageClose();

    body.querySelector('[name=targetdevice]').value = dev;
    body.querySelector('[name=targetaction]').value = action;
    if (formatValue !== null) body.querySelector('#format').value = formatValue;
    body.querySelector('#formdevice').submit();
}

function formatDevice() {
    event.preventDefault();
    issStorageSubmit('format');
}

function umountDevice() {
    event.preventDefault();
    issStorageSubmit('unmount');
}

function mountDevice() {
    event.preventDefault();
    issStorageSubmit('mount');
}
