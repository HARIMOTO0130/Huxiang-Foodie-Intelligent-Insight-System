<template>
  <div class="about-container">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1>关于我们</h1>
      <p>湖湘食客智能洞察系统简介</p>
    </div>

    <!-- 内容卡片 -->
    <el-card shadow="hover" class="about-card">
      <template #header>
        <div class="card-header">
          <i class="fas fa-info-circle"></i>
          <span>系统概述</span>
        </div>
      </template>
      <div class="card-content">
        <p>湖湘食客智能洞察系统是一款专为餐饮行业打造的数据分析平台，致力于为餐厅经营者和美食爱好者提供全方位的市场洞察和数据支持。</p>
        <p class="mt-4">通过先进的数据分析技术，我们能够实时监控市场动态、用户行为和餐厅表现，帮助您做出更明智的业务决策。</p>
      </div>
    </el-card>

    <!-- 核心功能 -->
    <div class="features-section">
      <h2 class="section-title">
        <i class="fas fa-star"></i> 核心功能
      </h2>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :md="8">
          <el-card shadow="hover" class="feature-card">
            <div class="feature-content">
              <div class="feature-icon">
                <i class="fas fa-chart-line text-primary"></i>
              </div>
              <h3>数据分析</h3>
              <p>实时跟踪和分析访问量、用户增长等关键指标</p>
            </div>
          </el-card>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8">
          <el-card shadow="hover" class="feature-card">
            <div class="feature-content">
              <div class="feature-icon">
                <i class="fas fa-utensils text-success"></i>
              </div>
              <h3>菜系洞察</h3>
              <p>深入了解各菜系分布和受欢迎程度</p>
            </div>
          </el-card>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8">
          <el-card shadow="hover" class="feature-card">
            <div class="feature-content">
              <div class="feature-icon">
                <i class="fas fa-crown text-warning"></i>
              </div>
              <h3>餐厅排行</h3>
              <p>查看最受欢迎餐厅的实时排名情况</p>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- 团队介绍 -->
    <div class="team-section">
      <h2 class="section-title">
        <i class="fas fa-users"></i> 开发团队
      </h2>
      <div class="team-content">
        <p>我们是一支专注于数据科学和餐饮行业的专业团队，致力于通过技术创新为餐饮行业带来价值。</p>
        <p class="mt-4">如有任何问题或建议，请随时联系我们。</p>
      </div>
    </div>

    <!-- 联系信息 -->
    <el-card shadow="hover" class="contact-card">
      <template #header>
        <div class="card-header">
          <i class="fas fa-envelope"></i>
          <span>联系我们</span>
        </div>
      </template>
      <div class="contact-content">
        <div class="contact-item">
          <i class="fas fa-envelope text-primary mr-3"></i>
          <span>contact@huxiangfoodie.com</span>
        </div>
        <div class="contact-item">
          <i class="fas fa-phone text-primary mr-3"></i>
          <span>400-123-4567</span>
        </div>
        <div class="contact-item">
          <i class="fas fa-map-marker-alt text-primary mr-3"></i>
          <span>湖南省长沙市岳麓区麓谷大道</span>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { ElCard, ElRow, ElCol } from 'element-plus'

// 页面挂载时的逻辑
onMounted(() => {
  // 可以在这里添加页面加载时的初始化逻辑
  console.log('About页面已加载')
})
</script>

<style scoped>
.about-container {
  padding: 20px;
  background-color: #f5f7fa;
  min-height: calc(100vh - 60px); /* 减去顶部导航栏高度 */
  box-sizing: border-box;
}

/* 页面标题 */
.page-header {
  text-align: center;
  margin-bottom: 30px;
  padding: 20px 0;
}

.page-header h1 {
  color: #303133;
  font-size: 28px;
  margin-bottom: 10px;
  font-weight: 600;
}

.page-header p {
  color: #606266;
  font-size: 16px;
}

/* 卡片通用样式 */
.about-card,
.contact-card {
  margin-bottom: 30px;
  transition: all 0.3s ease;
}

.about-card:hover,
.contact-card:hover {
  transform: translateY(-5px);
}

.card-header {
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  color: #303133;
}

.card-header i {
  margin-right: 8px;
  color: #409eff;
}

.card-content {
  line-height: 1.8;
  color: #606266;
  font-size: 15px;
}

.mt-4 {
  margin-top: 16px;
}

/* 功能区块 */
.features-section {
  margin-bottom: 30px;
}

.section-title {
  display: flex;
  align-items: center;
  font-size: 22px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #ecf5ff;
}

.section-title i {
  margin-right: 10px;
  color: #409eff;
}

.feature-card {
  transition: all 0.3s ease;
  height: 100%;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

.feature-content {
  padding: 20px;
  text-align: center;
}

.feature-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #ecf5ff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 15px;
  font-size: 24px;
}

.feature-content h3 {
  font-size: 18px;
  color: #303133;
  margin-bottom: 10px;
  font-weight: 500;
}

.feature-content p {
  color: #606266;
  line-height: 1.6;
  font-size: 14px;
}

/* 团队介绍 */
.team-section {
  margin-bottom: 30px;
}

.team-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  line-height: 1.8;
  color: #606266;
}

/* 联系信息 */
.contact-content {
  padding: 10px 0;
}

.contact-item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  font-size: 15px;
  color: #606266;
}

.contact-item:last-child {
  margin-bottom: 0;
}

.contact-item i {
  width: 20px;
  text-align: center;
}

.mr-3 {
  margin-right: 12px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .about-container {
    padding: 15px 10px;
  }

  .page-header h1 {
    font-size: 24px;
  }

  .page-header p {
    font-size: 14px;
  }

  .section-title {
    font-size: 20px;
  }

  .card-content,
  .team-content {
    font-size: 14px;
  }

  .feature-icon {
    width: 50px;
    height: 50px;
    font-size: 20px;
  }

  .feature-content h3 {
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .about-container {
    padding: 10px 5px;
  }

  .page-header h1 {
    font-size: 22px;
  }

  .section-title {
    font-size: 18px;
  }

  .card-header {
    font-size: 14px;
  }
}
</style>