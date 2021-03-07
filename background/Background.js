import React, {useEffect, useRef, useState} from 'react';
import {View, useWindowDimensions} from "react-native";
import {GLView} from "expo-gl";
import vShaderSrc from "./shaders/vShader.frag";
import fShaderSrc from "./shaders/fShader.frag";

const Background = ({millisInPreviousSegments, latestStartTime}) => {
  const glRef = useRef();
  const programRef = useRef();
  const timeAddressRef = useRef();
  const animationFrameRef = useRef();
  const dimensions = useWindowDimensions();

  const onContextCreate = (gl) => {
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.clearColor(0, 0, 0, 0);

    // Create vertex shader (shape & position)
    const vert = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vert, vShaderSrc);
    gl.compileShader(vert);

    // Create fragment shader (color)
    const frag = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(frag, fShaderSrc);
    gl.compileShader(frag);

    // Link together into a program
    const program = gl.createProgram();
    gl.attachShader(program, vert);
    gl.attachShader(program, frag);

    gl.linkProgram(program);
    gl.useProgram(program);
    const uniformLoc = name => gl.getUniformLocation(program, name);
    gl.uniform2f(uniformLoc("iResolution"),
      dimensions.width * dimensions.scale,
      dimensions.height * dimensions.scale);
    timeAddressRef.current = uniformLoc("iTime");
    gl.uniform1f(timeAddressRef.current, 0);

    const attrPosition = gl.getAttribLocation(program, "aPos");
    gl.vertexAttribPointer(attrPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(attrPosition);

    const positionBuffer = gl.createBuffer();

    // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    const positions = [
      -1, -1,
      -1, 1,
      1, -1,
      1, 1
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    const size = 2;          // 2 components per iteration
    const type = gl.FLOAT;   // the data is 32bit floats
    const normalize = false; // don't normalize the data
    const stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    const offset = 0;        // start at the beginning of the buffer
    gl.vertexAttribPointer(
      attrPosition, size, type, normalize, stride, offset);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    gl.flush();
    gl.endFrameEXP();
    glRef.current = gl;
    programRef.current = program;
  }

  const animationLoop = currentTime => {
    const gl = glRef.current;
    const program = programRef.current;
    if (gl && latestStartTime && program) {
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.useProgram(program);
      gl.uniform1f(timeAddressRef.current,
        (millisInPreviousSegments + currentTime - latestStartTime) / 1000.0);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      gl.flush();
      gl.endFrameEXP();
    }
    animationFrameRef.current = requestAnimationFrame(animationLoop);
  }

  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(animationLoop);
    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [latestStartTime])

  return (
    <View style={{position: 'absolute', top: 0, left: 0}}>
      <GLView
        style={{width: dimensions.width, height: dimensions.height}}
        onContextCreate={onContextCreate}/>
    </View>
  )
}

export default Background;
