<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ref } from 'vue'
// 应用根组件

// 移动端导航菜单开关
const isMenuOpen = ref(false)

// 切换菜单显示状态
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <div class="app-container">
    <!-- 顶部导航栏 -->
    <header class="navbar">
      <div class="navbar-content">
        <div class="logo">
          <i class="fas fa-utensils"></i>
          <span class="system-name">湖湘食客智能洞察系统</span>
        </div>
        
        <!-- 移动端菜单按钮 -->
        <button class="menu-toggle" @click="toggleMenu">
          <i class="fas fa-bars"></i>
        </button>
        
        <nav class="nav-menu" :class="{ 'menu-open': isMenuOpen }">
          <router-link to="/" class="nav-item" @click="isMenuOpen = false">
            <i class="fas fa-chart-line"></i>
            <span>数据看板</span>
          </router-link>
          <router-link to="/data-management" class="nav-item" @click="isMenuOpen = false">
            <i class="fas fa-database"></i>
            <span>数据管理</span>
          </router-link>
          <router-link to="/system-settings" class="nav-item" @click="isMenuOpen = false">
            <i class="fas fa-cog"></i>
            <span>系统设置</span>
          </router-link>
        </nav>
      </div>
    </header>
    <!-- 主内容区域 -->
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style>
/* 引入Font Awesome图标 */
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

/* 全局样式重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f5f7fa;
  color: #303133;
}

.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 顶部导航栏样式 */
.navbar {
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.navbar-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  font-weight: bold;
  flex-shrink: 0;
}

.logo i {
  font-size: 24px;
  color: #f56c6c;
  margin-right: 10px;
}

.system-name {
  font-size: 20px;
  color: #303133;
}

/* 移动端菜单按钮 */
.menu-toggle {
  display: none;
  background: none;
  border: none;
  font-size: 24px;
  color: #606266;
  cursor: pointer;
  padding: 5px;
  z-index: 1100;
}

.nav-menu {
  display: flex;
  gap: 20px;
  align-items: center;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  color: #606266;
  text-decoration: none;
  border-radius: 4px;
  transition: all 0.3s;
}

.nav-item:hover {
  color: #f56c6c;
  background-color: #f5f7fa;
}

.nav-item i {
  margin-right: 6px;
  font-size: 16px;
}

.nav-item.router-link-active {
  color: #f56c6c;
  background-color: #fff2f0;
}

/* 响应式导航样式 */
@media (max-width: 768px) {
  .menu-toggle {
    display: block;
  }
  
  .nav-menu {
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    flex-direction: column;
    background-color: #ffffff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    padding: 10px 0;
    gap: 5px;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
    z-index: 900;
  }
  
  .nav-menu.menu-open {
    max-height: 300px;
  }
  
  .nav-item {
    width: 100%;
    justify-content: center;
    padding: 12px 20px;
  }
  
  .system-name {
    font-size: 16px;
  }
  
  .logo i {
    font-size: 20px;
  }
}

@media (max-width: 480px) {
  .navbar-content {
    padding: 0 15px;
  }
  
  .system-name {
    font-size: 14px;
    margin-left: 5px;
  }
  
  .logo i {
    font-size: 18px;
    margin-right: 5px;
  }
}

/* 主内容区域样式 */
.main-content {
  flex: 1;
  margin-top: 60px;
  padding: 20px;
}
</style>
