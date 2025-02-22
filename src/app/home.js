"use client";
import * as React from 'react'

import "aframe";
import { useEffect } from "react/cjs/react.production";

export default function DynamicHome() {

  const [controller_object, set_controller_object] = React.useState(new THREE.Object3D())
  const [trigger_on, set_trigger_on] = React.useState(false)
  const [grip_on, set_grip_on] = React.useState(false);
  const [grip_value, set_grip_value] = React.useState(0);
  const gripRef = React.useRef(false);
  const gripValueRef = React.useRef(0);

  const [button_a_on, set_button_a_on] = React.useState(false);
  const buttonaRef = React.useRef(null);
  const [button_b_on, set_button_b_on] = React.useState(false)
  const buttonbRef = React.useRef(null);
  const [start_pos, set_start_pos] = React.useState({})
  const [save_target, set_save_target] = React.useState()
  const [vr_mode, set_vr_mode] = React.useState(false)

  const order = 'ZYX';

  React.useEffect(() => {
    console.log("useEffect");
    if (!AFRAME.components['vr-controller-right']) {
      console.log("Registering VR Controller Component");
      AFRAME.registerComponent('vr-controller-right', {
        init: function () {
          console.log("Initialized!");
          set_controller_object(this.el.object3D)
          this.el.object3D.rotation.order = order
          this.el.addEventListener('triggerdown', (evt) => {
            const wk_start_pos = new THREE.Vector4(0, 0, 0, 1).applyMatrix4(this.el.object3D.matrix)
            set_trigger_on(true)
          });
          this.el.addEventListener('triggerup', (evt) => {
            set_trigger_on(false)
          });
          this.el.addEventListener('gripdown', (evt) => {
            set_grip_on(true);
          });
          this.el.addEventListener('gripchanged', (evt) => {
            //                console.log("Grip Value", evt.detail.value);
            set_grip_value(evt.detail.value);
          });
          this.el.addEventListener('gripup', (evt) => {
            set_grip_on(false);
          });
          this.el.addEventListener('abuttondown', (evt) => {
            set_button_a_on(true);
          });
          this.el.addEventListener('abuttonup', (evt) => {
            set_button_a_on(false);
          });
          this.el.addEventListener('bbuttondown', (evt) => {
            set_input_rotate([0, 0, 0, 0, 0, 0, 0]);// reset (need to reset target also.)
            set_button_b_on(true);
          });
          this.el.addEventListener('bbuttonup', (evt) => {
            set_button_b_on(false);
          });
        },
        tick: function (time, deltaTime) {
        }
      });
      
    }
  }, []);

  React.useEffect(() => {
    console.log("controller_object", controller_object.position)
    console.log("controller_object", controller_object.rotation)
  }, [controller_object.position.x]);

  React.useEffect(() => {
    console.log("controller_object", controller_object.position)
    console.log("controller_object", controller_object.rotation)
  }, [controller_object.position.x]);


  return (
    <>
      <a-scene xr-mode-ui="XRMode: ar">
        <a-entity oculus-touch-controls="hand: right" vr-controller-right visible="true"></a-entity>
        <a-box position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9"></a-box>
      </a-scene>
    </>
  );
}
