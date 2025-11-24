<script setup lang="ts">
// 数据管理页面组件
import { ref } from 'vue'

// 模拟数据
const dataItems = ref([
  { id: 1, name: '用户数据', type: 'user', count: 1568, lastUpdated: '2024-01-15' },
  { id: 2, name: '菜品数据', type: 'dish', count: 432, lastUpdated: '2024-01-14' },
  { id: 3, name: '订单数据', type: 'order', count: 2785, lastUpdated: '2024-01-15' },
  { id: 4, name: '评价数据', type: 'review', count: 892, lastUpdated: '2024-01-13' },
  { id: 5, name: '访问日志', type: 'log', count: 12580, lastUpdated: '2024-01-15' }
])

// 当前选中的数据类型
const selectedType = ref('all')

// 过滤数据
const filteredData = ref(dataItems.value)

// 切换数据类型过滤
const filterByType = (type: string) => {
  selectedType.value = type
  if (type === 'all') {
    filteredData.value = dataItems.value
  } else {
    filteredData.value = dataItems.value.filter(item => item.type === type)
  }
}

// 刷新数据
const refreshData = () => {
  // 实际项目中这里应该调用API获取最新数据
  console.log('刷新数据')
}
</script>

<template>
  <div class="data-management-page">
    <header class="page-header">
      <h1><i class="fas fa-database"></i> 数据管理</h1>
      <div class="header-actions">
        <button class="btn-refresh" @click="refreshData">
          <i class="fas fa-sync-alt"></i> 刷新数据
        </button>
      </div>
    </header>
    
    <div class="data-filters">
      <el-radio-group v-model="selectedType" size="small" @change="filterByType(selectedType)">
        <el-radio-button label="all">全部数据</el-radio-button>
        <el-radio-button label="user">用户数据</el-radio-button>
        <el-radio-button label="dish">菜品数据</el-radio-button>
        <el-radio-button label="order">订单数据</el-radio-button>
        <el-radio-button label="review">评价数据</el-radio-button>
      </el-radio-group>
    </div>
    
    <el-card class="data-table-card" shadow="hover">
      <el-table :data="filteredData" style="width: 100%">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="数据名称" width="180">
          <template #default="{ row }">
            <div class="data-name">
              <i :class="getTypeIcon(row.type)"></i>
              <span>{{ row.name }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="count" label="数据数量">
          <template #default="{ row }">
            <el-tag size="small" type="success">{{ row.count.toLocaleString() }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="lastUpdated" label="最后更新" width="140" />
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="{ row }">
            <el-button size="small" type="primary" text>
              <i class="fas fa-edit"></i> 编辑
            </el-button>
            <el-button size="small" type="danger" text>
              <i class="fas fa-download"></i> 导出
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    
    <div class="data-stats">
      <el-card shadow="hover" class="stat-card">
        <div class="stat-icon primary">
          <i class="fas fa-database"></i>
        </div>
        <div class="stat-content">
          <div class="stat-value">{{ dataItems.length }}</div>
          <div class="stat-label">数据类型</div>
        </div>
      </el-card>
      
      <el-card shadow="hover" class="stat-card">
        <div class="stat-icon success">
          <i class="fas fa-chart-bar"></i>
        </div>
        <div class="stat-content">
          <div class="stat-value">{{ dataItems.reduce((sum, item) => sum + item.count, 0).toLocaleString() }}</div>
          <div class="stat-label">总数据量</div>
        </div>
      </el-card>
      
      <el-card shadow="hover" class="stat-card">
        <div class="stat-icon warning">
          <i class="fas fa-clock"></i>
        </div>
        <div class="stat-content">
          <div class="stat-value">{{ new Date().toLocaleDateString() }}</div>
          <div class="stat-label">更新日期</div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  methods: {
    getTypeIcon(type: string) {
      const iconMap: Record<string, string> = {
        user: 'fas fa-users',
        dish: 'fas fa-utensils',
        order: 'fas fa-shopping-cart',
        review: 'fas fa-star',
        log: 'fas fa-history'
      }
      return iconMap[type] || 'fas fa-database'
    }
  }
}
</script>

<style scoped>
.data-management-page {
  padding: 20px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.page-header h1 {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 24px;
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 10px;
}

.data-filters {
  margin-bottom: 20px;
}

.data-table-card {
  margin-bottom: 20px;
}

.data-name {
  display: flex;
  align-items: center;
  gap: 8px;
}

.data-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.stat-card {
  display: flex;
  align-items: center;
  padding: 20px;
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-right: 20px;
  color: #fff;
}

.stat-icon.primary {
  background-color: #409eff;
}

.stat-icon.success {
  background-color: #67c23a;
}

.stat-icon.warning {
  background-color: #e6a23c;
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: 28px;
  font-weight: bold;
  color: #303133;
}

.stat-label {
  font-size: 14px;
  color: #606266;
  margin-top: 5px;
}

.btn-refresh {
  background-color: #409eff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: background-color 0.3s;
}

.btn-refresh:hover {
  background-color: #66b1ff;
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  
  .data-stats {
    grid-template-columns: 1fr;
  }
  
  .stat-card {
    padding: 15px;
  }
  
  .stat-icon {
    width: 50px;
    height: 50px;
    font-size: 20px;
  }
  
  .stat-value {
    font-size: 24px;
  }
}
</style>