<!--
 * @ Author: willysliang
 * @ CreateTime: 2025-07-10 15:19:58
 * @ Modifier: willysliang
 * @ ModifierTime: 2025-07-10 16:06:54
 * @ Description: 电子签名组件
 -->

<script setup lang="ts">
import * as SvgList from './SvgList.tsx'
import { useSign } from './useSign'

/** 画笔颜色列表 */
const strokeColors = [
  '#2c3e50',
  '#34495e',
  '#5c3e50',
  '#e74c3c',
  '#3498db',
  '#2ecc71',
  '#f1c40f',
  '#9b59b6',
  '#1abc9c',
  '#eb8bc7',
]

const {
  canvasRef,
  ctxConfig,
  signature,
  clearCanvas,
  saveSignature,
  exportSignature,
} = useSign()
</script>

<template>
  <div class="signature-app">
    <div class="header">
      <h1>电子签名板</h1>
      <p>使用Canvas实现的电子签名组件，支持自定义画笔设置和签名导出</p>
    </div>

    <div class="signature-container">
      <div class="signature-pad-container">
        <div
          class="signature-canvas-container"
          :class="{
            active: signature.isDrawing,
            'has-signature': signature.hasSignature,
          }"
        >
          <div class="signature-mock">
            <p>在此区域签名 - 使用鼠标或触摸设备</p>
          </div>
          <canvas ref="canvasRef"></canvas>
        </div>
      </div>

      <div class="controls">
        <div class="tools-panel">
          <div class="panel-title">签名设置</div>

          <div class="tool-group">
            <div class="tool-group-title">
              <SvgList.SvgStrockColor />
              画笔颜色
            </div>
            <div class="brush-controls">
              <div
                v-for="color in strokeColors"
                :key="color"
                class="brush-color"
                :class="{ active: ctxConfig.strokeStyle === color }"
                :style="{ backgroundColor: color }"
                @click="ctxConfig.strokeStyle = color"
              ></div>
            </div>
          </div>

          <div class="tool-group">
            <div class="tool-group-title">
              <SvgList.SvgStrockBrush />
              画笔粗细
            </div>
            <div class="brush-size">
              <div class="brush-preview">
                <div
                  class="preview-circle"
                  :style="{
                    width: ctxConfig.lineWidth + 'px',
                    height: ctxConfig.lineWidth + 'px',
                    backgroundColor: ctxConfig.strokeStyle,
                  }"
                ></div>
              </div>
              <div class="slider-container">
                <input
                  v-model.number="ctxConfig.lineWidth"
                  type="range"
                  min="1"
                  max="20"
                />
              </div>
            </div>
          </div>

          <div class="tool-group">
            <div class="tool-group-title">
              <SvgList.SvgSignatureAction />
              签名操作
            </div>
            <div class="signature-actions">
              <button
                class="clear-btn"
                :disabled="!signature.hasSignature"
                @click="clearCanvas"
              >
                <SvgList.SvgClear />
                清除签名
              </button>
              <button
                class="save-btn"
                :disabled="!signature.hasSignature"
                @click="saveSignature"
              >
                <SvgList.SvgSave />
                保存签名
              </button>
              <button
                class="export-btn"
                :disabled="!signature.hasSignature"
                @click="exportSignature"
              >
                <SvgList.SvgExport />
                导出签名
              </button>
            </div>
          </div>
        </div>

        <div class="signature-preview">
          <div class="preview-title">签名预览</div>
          <div v-if="!signature.signatureDataUrl" class="preview-placeholder">
            签名后将显示预览
          </div>
          <img
            :src="signature.signatureDataUrl"
            class="preview-image"
            :class="{ active: signature.signatureDataUrl }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.signature-app {
  width: 100%;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 20px;
  color: #333;
}

.header {
  text-align: center;
  margin-bottom: 30px;

  h1 {
    font-size: 3rem;
    color: #2c3e50;
    margin-bottom: 10px;
    text-shadow: 1px 1px 3px rgb(0 0 0 / 10%);
  }

  p {
    font-size: 1.2rem;
    color: #7f8c8d;
    max-width: 600px;
    margin: 0 auto;
  }
}

.signature-container {
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 15px 30px rgb(0 0 0 / 15%);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 25px;
  padding: 30px;

  .signature-pad-container {
    flex: 1;
  }

  .signature-canvas-container {
    border: 2px dashed #e0e6ed;
    border-radius: 15px;
    background-color: #f8f9fa;
    position: relative;
    height: 400px;
    overflow: hidden;
    transition: border-color 0.3s;

    &.active {
      border-color: #3498db;
    }

    .signature-mock {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #95a5a6;
      pointer-events: none;
      transition: opacity 0.3s;
    }

    canvas {
      width: 100%;
      height: 100%;
      cursor: crosshair;
      background: transparent;
    }
  }

  .has-signature .signature-mock {
    opacity: 0;
  }
}

@media (width >= 992px) {
  .signature-container {
    flex-direction: row;
  }
}

.controls {
  flex: 0 0 280px;

  /** 签名设置 */
  .tools-panel {
    background: linear-gradient(to bottom, #f8f9fa, #e9ecef);
    border-radius: 15px;
    padding: 25px;
    box-shadow: 0 5px 15px rgb(0 0 0 / 5%);

    .panel-title {
      font-size: 1.4rem;
      font-weight: 600;
      color: #2c3e50;
      margin-bottom: 25px;
      text-align: center;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        bottom: -8px;
        left: 50%;
        transform: translateX(-50%);
        width: 50px;
        height: 3px;
        background: linear-gradient(90deg, #3498db, #2c3e50);
        border-radius: 3px;
      }
    }
  }

  /** 签名设置的设置项 */
  .tool-group {
    &:not(:last-child) {
      margin-bottom: 25px;
    }

    /** 签名设置每个头部的公共样式 */
    .tool-group-title {
      font-weight: 600;
      margin-bottom: 12px;
      color: #34495e;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    /** 画笔颜色 */
    .brush-controls {
      display: flex;
      gap: 15px;
      flex-wrap: wrap;

      .brush-color {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.2s;
        border: 2px solid transparent;

        &.active {
          transform: scale(1.1);
          border-color: #fff;
          box-shadow: 0 0 0 2px #3498db;
        }
      }
    }

    /** 画笔粗细 */
    .brush-size {
      display: flex;
      align-items: center;
      gap: 15px;

      .brush-preview {
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;

        .preview-circle {
          border-radius: 50%;
          background-color: currentcolor;
        }
      }

      .slider-container {
        flex: 1;

        input[type='range'] {
          width: 100%;
          height: 5px;
          appearance: none;
          background: #e0e6ed;
          border-radius: 5px;
          outline: none;

          &::-webkit-slider-thumb {
            appearance: none;
            width: 20px;
            height: 20px;
            background: #3498db;
            border-radius: 50%;
            cursor: pointer;
            box-shadow: 0 3px 5px rgb(0 0 0 / 10%);
          }
        }
      }
    }

    /** 签名操作 */
    .signature-actions {
      display: flex;
      flex-direction: column;
      gap: 15px;

      button {
        padding: 14px 20px;
        border: none;
        border-radius: 50px;
        font-weight: 600;
        font-size: 1rem;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        color: white;

        &:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        &:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgb(0 0 0 / 10%);
        }

        &.clear-btn {
          background-color: #e74c3c;
        }

        &.save-btn {
          background-color: #2ecc71;
        }

        &.export-btn {
          background: linear-gradient(90deg, #3498db, #2980b9);
        }
      }
    }
  }

  /** 签名预览 */
  .signature-preview {
    margin-top: 30px;
    text-align: center;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 15px;
    min-height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;

    .preview-title {
      font-weight: 600;
      font-size: 1.2rem;
      color: #2c3e50;
    }

    .preview-placeholder {
      color: #95a5a6;
      font-style: italic;
    }

    .preview-image {
      max-width: 100%;
      max-height: 100px;
      border-radius: 5px;
      box-shadow: 0 3px 10px rgb(0 0 0 / 10%);
      display: none;

      &.active {
        display: block;
      }
    }
  }
}
</style>
