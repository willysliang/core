<!--
 * @ Author: willysliang
 * @ CreateTime: 2025-07-10 16:17:43
 * @ Modifier: willysliang
 * @ ModifierTime: 2025-07-11 17:06:34
 * @ Description: todoList的列表展示
 -->

<script setup lang="ts">
import { Check, Close } from '@icon-park/vue-next'
import IconPark from '@comp/common/IconPark.vue'
import type { ITodoListProps } from './type.d'

const { title, todos, themes } = withDefaults(defineProps<ITodoListProps>(), {
  title: '',
  todos: () => [],
  themes: () => [
    {
      border: '#ff7e5f',
      bg: 'rgba(255, 126, 95, 0.2)',
      color: '#ff7e5f',
    },
    {
      border: '#4a69bd',
      bg: 'rgba(74, 105, 189, 0.2)',
      color: '#4a69bd',
    },
    {
      border: '#6a89cc',
      bg: 'rgba(106, 137, 204, 0.2)',
      color: '#6a89cc',
    },
    {
      border: '#3dc1d3',
      bg: 'rgba(61, 193, 211, 0.2)',
      color: '#3dc1d3',
    },
  ],
})
</script>

<template>
  <div class="container">
    <div class="todo-title">
      <span>{{ title }}</span>
    </div>

    <div class="todo-list">
      <div
        v-for="(task, taskIndex) in todos"
        :key="taskIndex"
        class="todo-card"
        :style="{ borderTopColor: themes[taskIndex % themes.length].border }"
      >
        <div class="card-header">
          <IconPark
            class="card-icon"
            :style="{
              background: themes[taskIndex % themes.length].bg,
              color: themes[taskIndex % themes.length].color,
            }"
            :icon="task.icon"
          />
          <span class="task-number">任务 #{{ taskIndex + 1 }}</span>
        </div>
        <div class="card-title">{{ task.taskName }}</div>
        <p class="card-desc">{{ task.taskDesc }}</p>

        <ul v-if="task?.features?.length" class="features">
          <li
            v-for="(feature, featureIdx) in task?.features || []"
            :key="`${taskIndex}-${featureIdx}`"
          >
            <IconPark class="feature-icon active" :icon="Check" :size="18" />
            <span>{{ feature }}</span>
          </li>
          <li
            v-for="(feature, featureIdx) in task?.todoFeatures || []"
            :key="`${taskIndex}-todo-${featureIdx}`"
          >
            <IconPark class="feature-icon" :icon="Close" :size="18" />
            <span>{{ feature }}</span>
          </li>
        </ul>

        <div v-if="task?.tags?.length" class="tech-tags">
          <span
            v-for="(tag, tagIdx) in task.tags"
            :key="`${taskIndex}-${tagIdx}`"
            class="tech-tag"
          >
            {{ tag }}
          </span>
        </div>

        <div class="progress-container">
          <div class="progress-label">
            <span>开发进度</span>
            <span class="progress-value">{{ task.progressNum }}%</span>
          </div>
          <div class="progress-bar">
            <div class="progress" :style="`width: ${task.progressNum}%`"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  background: linear-gradient(135deg, #1e3c72, #2a5298);
  color: #fff;
  box-sizing: border-box;
  padding: 25px;
  overflow: hidden auto;

  .todo-title {
    font-size: 2.3rem;
    line-height: 2.3rem;
    margin-bottom: 3rem;
    font-weight: 700;
    text-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    text-align: center;

    span {
      display: inline-block;
      position: relative;

      &::before {
        content: '';
        position: absolute;
        bottom: -0.8rem;
        left: 0;
        width: 100%;
        height: 4px;
        background: linear-gradient(90deg, #ff7e5f, #feb47b);
        border-radius: 10px;
      }
    }
  }
}

.todo-list {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
  gap: 30px;
  // grid-template-columns: repeat(auto-fit, minmax(22%, 1fr));
  // gap: 1.5%;

  .todo-card {
    background: rgba(255, 255, 255, 0.13);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-top: 4px solid #ff7e5f;
    border-radius: 20px;
    padding: 20px;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
    transition: all 0.4s ease;
    position: relative;
    overflow: hidden;
    z-index: 1;
    display: flex;
    flex-direction: column;

    &::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(
        circle,
        rgba(255, 255, 255, 0.1) 0%,
        rgba(255, 255, 255, 0.03) 70%
      );
      z-index: -1;
    }

    &:hover {
      transform: translateY(-15px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
      background: rgba(255, 255, 255, 0.18);
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;

      .card-icon {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.8rem;
        background: rgba(255, 126, 95, 0.2);
        color: #ff7e5f;
      }

      .task-number {
        font-size: 1rem;
        font-weight: 600;
        color: #ff7e5f;
        background: rgba(255, 255, 255, 0.15);
        padding: 5px 12px;
        border-radius: 20px;
      }
    }

    .card-title {
      font-size: 1.7rem;
      font-weight: 600;
      margin-bottom: 15px;
      color: #fff;
      letter-spacing: 0.5px;
    }

    .card-desc {
      font-size: 0.9rem;
      line-height: 1.7;
      margin-bottom: 10px;
      opacity: 0.85;
      font-weight: 300;
    }

    .features {
      list-style: none;
      padding-top: 15px;
      flex: 1;

      li {
        padding: 8px 0;
        display: flex;
        align-items: center;
        position: relative;
        padding-left: 30px;

        .feature-icon {
          position: absolute;
          left: 0;
          color: red;

          &.active {
            color: #4cd137;
          }
        }
      }
    }

    .tech-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 20px;

      .tech-tag {
        background: rgba(255, 255, 255, 0.1);
        padding: 5px 12px;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 500;
      }
    }

    .progress-container {
      margin-top: 25px;

      .progress-label {
        display: flex;
        justify-content: space-between;
        font-size: 0.95rem;
        margin-bottom: 8px;

        .progress-value {
          font-size: 0.9rem;
          color: #feb47b;
          font-weight: 600;
        }
      }

      .progress-bar {
        width: 100%;
        height: 10px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 10px;
        overflow: hidden;

        .progress {
          height: 100%;
          border-radius: 10px;
          background: linear-gradient(90deg, #ff7e5f, #feb47b);
          transition: width 1s ease-in-out;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .title {
    font-size: 2.5rem;
  }

  .card-title {
    font-size: 1.5rem;
  }
}
</style>
