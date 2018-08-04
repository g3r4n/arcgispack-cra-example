import { SceneView,SceneLayer } from "arcgispack";
import React, { Component } from "react";

export default class ReactMapView extends Component {
  componentDidMount() {
    var view = new SceneView({
      container: this.mapViewDiv,
      map: this.props.map,
      zoom: 4,
      camera: {
        position: [-74.0338, 40.6913, 707],
        tilt: 81,
        heading: 50
      },
      ui: {
        components: []
      }
    });
    view.watch("center", this._onCenterChange.bind(this));
    // Create SceneLayer and add to the map
    var sceneLayer = new SceneLayer({
      portalItem: {
        id: "2e0761b9a4274b8db52c4bf34356911e"
      },
      popupEnabled: false
    });
    this.props.map.add(sceneLayer);

    // Create MeshSymbol3D for symbolizing SceneLayer
    var symbol =  {
      type: "mesh-3d" ,
      symbolLayers: [{
        type: "fill",
        material: {
          color: "#ffffff",
          colorMixMode: "replace"
        },
        // edges: {
        //   type: 'solid',
        //   color: [0, 0, 0, 0.6],
        //   size: 1
        // }
      }]
    };
    // Add the renderer to sceneLayer
    sceneLayer.renderer = {
      type: "simple", // autocasts as new SimpleRenderer()
      symbol: symbol
    };
  }
  _onCenterChange(center) {
    if (typeof this.props.onCenterChange === "function") {
      this.props.onCenterChange(center.toJSON());
    }
  }
  render() {
    return (
      <div
        style={{ height: "100%", width: "100%" }}
        ref={mapViewDiv => {
          this.mapViewDiv = mapViewDiv;
        }}
      />
    );
  }
}
