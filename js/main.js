// element id -> spec file (Vega-Lite, except the treemap which is Vega)
const charts = {
  c01: "vis/c01_flow_map.json",
  c02: "vis/c02_covid_panels.json",
  c03: "vis/c03_origin_bump.json",
  c04: "vis/c04_symbol_map.json",
  c05: "vis/c05_state_dumbbell.json",
  c06: "vis/c06_seasonality_heatmap.json",
  c07: "vis/c07_reason_streamgraph.json",
  c08: "vis/c08_stay_slope.json",
  c09: "vis/c09_business_choropleth.json",
  c10: "vis/c10_business_waterfall.json",
  c11: "vis/c11_coastal_waffle.json",
  c12: "vis/c12_recovery_index.json",
  c13: "vis/c13_spend_treemap.vg.json",
  c13b: "vis/c13b_gva_treemap.vg.json",
  c14: "vis/c14_coastal_choropleth.json",
  c15b: "vis/c15b_spend_symbol_map_coastal.json",
  c16: "vis/c16_jobs_butterfly.json"
};

// one line per array entry, like Vega does
function lines(text) {
  const div = document.createElement("div");
  [].concat(text).forEach((line, i) => {
    if (i > 0) div.appendChild(document.createElement("br"));
    div.appendChild(document.createTextNode(line));
  });
  return div;
}

// Draw the spec's title above the chart in HTML instead of inside the canvas, so every title
// starts at the card's left edge even though the charts themselves are centred.
function addTitle(el, title) {
  if (!title) return;
  const box = document.createElement("div");
  box.className = "chart-title";
  const text = lines(title.text);
  text.className = "chart-title-text";
  box.appendChild(text);
  if (title.subtitle) {
    const sub = lines(title.subtitle);
    sub.className = "chart-subtitle";
    box.appendChild(sub);
  }
  // side-by-side cards: the chart already sits at the left of its grid cell, so the title goes inside it
  if (el.parentElement.classList.contains("side")) el.prepend(box);
  else el.before(box);
}

for (const [id, path] of Object.entries(charts)) {
  fetch(path)
    .then(res => {
      if (!res.ok) throw new Error(`HTTP ${res.status} loading ${path}`);
      return res.json();
    })
    .then(spec => {
      const el = document.getElementById(id);
      const title = spec.title;
      delete spec.title;
      return vegaEmbed(el, spec, { actions: false }).then(() => addTitle(el, title));
    })
    .catch(err => console.error("Failed to load " + path, err));
}
