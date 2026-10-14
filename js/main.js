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
  c13: "vis/c13_spend_treemap.vg.json"
};

for (const [id, path] of Object.entries(charts)) {
  fetch(path)
    .then(res => {
      if (!res.ok) throw new Error(`HTTP ${res.status} loading ${path}`);
      return res.json();
    })
    .then(spec => vegaEmbed("#" + id, spec, { actions: false }))
    .catch(err => console.error("Failed to load " + path, err));
}
