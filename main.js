var container = document.querySelector('#view'),
    loader = vega.loader(),
    renderType = 'svg',
    runtime = null,
    spec = null,
    view = null,
    current = null;

var select = document.querySelector('#specs');

select.addEventListener('change', function() {
  load(select.options[select.selectedIndex].value);
});

var render = document.querySelector('#render');

render.addEventListener('change', function() {
  renderType = render.options[render.selectedIndex].value;
  if (current) load(current);
});

loader.load( 'specs.json')
  .then(function(data) {
    // load manifest of test specifications
    JSON.parse(data).forEach(function(name) {
      var opt = document.createElement('option');
      opt.setAttribute('value', name);
      opt.textContent = name;
      select.appendChild(opt);
    });
  })
  .then(function() {
    // if query string is present, try to load spec
    if (location.search) load( location.search.slice(1));
  });

function load(name) {
  if (!name) {
    if (view) current = null, container.innerHTML = '';
    return;
  }
  // update select widget state
  select.selectedIndex = 0;
  for (var i=0, n=select.options.length; i<n; ++i) {
    if (select.options[i].value === name) {
      select.selectedIndex = i; break;
    }
  }

  vegaEmbed('#view', './spec/' + name, {renderer: renderType}).then(function(res) {
    view = res.view;
    current = name;
  }).catch( console.error );
}
