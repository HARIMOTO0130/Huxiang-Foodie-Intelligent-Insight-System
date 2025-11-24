<script setup lang="ts">
// 系统设置页面组件
import { ref } from 'vue'

// 设置项的活动标签
const activeTab = ref('system')

// 系统配置项
const systemConfig = ref({
  systemName: '湖湘食客智能洞察系统',
  theme: 'light',
  language: 'zh-CN',
  autoBackup: true,
  backupFrequency: 'daily',
  apiTimeout: 30,
  cacheExpiry: 60
})

// 用户管理数据
const users = ref([
  { id: 1, username: 'admin', role: '管理员', status: 'active', lastLogin: '2024-01-15 09:30' },
  { id: 2, username: 'analyst', role: '分析师', status: 'active', lastLogin: '2024-01-15 10:15' },
  { id: 3, username: 'editor', role: '编辑', status: 'active', lastLogin: '2024-01-14 16:45' },
  { id: 4, username: 'test', role: '测试用户', status: 'inactive', lastLogin: '2024-01-10 14:20' }
])

// 通知设置
const notificationSettings = ref({
  emailNotifications: true,
  systemNotifications: true,
  dataUpdateAlerts: true,
  errorAlerts: true,
  weeklyReports: true
})

// 保存系统配置
const saveSystemConfig = () => {
  // 实际项目中这里应该调用API保存配置
  console.log('保存系统配置', systemConfig.value)
}

// 保存通知设置
const saveNotificationSettings = () => {
  // 实际项目中这里应该调用API保存配置
  console.log('保存通知设置', notificationSettings.value)
}
</script>

<template>
  <div class="system-settings-page">
    <header class="page-header">
      <h1><i class="fas fa-cog"></i> 系统设置</h1>
    </header>
    
    <el-card class="settings-card" shadow="hover">
      <el-tabs v-model="activeTab" type="border-card">
        <!-- 系统配置标签页 -->
        <el-tab-pane label="系统配置" name="system">
          <div class="settings-form">
            <el-form label-position="top">
              <el-row :gutter="20">
                <el-col :span="24" :md="12">
                  <el-form-item label="系统名称">
                    <el-input v-model="systemConfig.systemName" placeholder="请输入系统名称" />
                  </el-form-item>
                </el-col>
                <el-col :span="24" :md="12">
                  <el-form-item label="主题设置">
                    <el-radio-group v-model="systemConfig.theme">
                      <el-radio label="light">浅色主题</el-radio>
                      <el-radio label="dark">深色主题</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
              
              <el-row :gutter="20">
                <el-col :span="24" :md="12">
                  <el-form-item label="语言设置">
                    <el-select v-model="systemConfig.language" placeholder="请选择语言">
                      <el-option label="简体中文" value="zh-CN" />
                      <el-option label="English" value="en-US" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="24" :md="12">
                  <el-form-item label="缓存过期时间（分钟）">
                    <el-input-number v-model="systemConfig.cacheExpiry" :min="1" :max="1440" />
                  </el-form-item>
                </el-col>
              </el-row>
              
              <el-row :gutter="20">
                <el-col :span="24" :md="12">
                  <el-form-item label="API超时时间（秒）">
                    <el-input-number v-model="systemConfig.apiTimeout" :min="5" :max="120" />
                  </el-form-item>
                </el-col>
                <el-col :span="24" :md="12">
                  <el-form-item label="数据备份">
                    <el-switch v-model="systemConfig.autoBackup" />
                    <el-select 
                      v-if="systemConfig.autoBackup" 
                      v-model="systemConfig.backupFrequency" 
                      placeholder="备份频率"
                      style="margin-left: 10px; width: 120px;"
                    >
                      <el-option label="每日" value="daily" />
                      <el-option label="每周" value="weekly" />
                      <el-option label="每月" value="monthly" />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              
              <el-form-item>
                <el-button type="primary" @click="saveSystemConfig">
                  <i class="fas fa-save"></i> 保存配置
                </el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        
        <!-- 用户管理标签页 -->
        <el-tab-pane label="用户管理" name="users">
          <div class="user-management">
            <el-table :data="users" style="width: 100%">
              <el-table-column prop="id" label="ID" width="80" />
              <el-table-column prop="username" label="用户名" width="150" />
              <el-table-column prop="role" label="角色">
                <template #default="{ row }">
                  <el-tag size="small" :type="getRoleType(row.role)">
                    {{ row.role }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="status" label="状态">
                <template #default="{ row }">
                  <el-switch v-model="row.status" :active-value="'active'" :inactive-value="'inactive'" />
                </template>
              </el-table-column>
              <el-table-column prop="lastLogin" label="最后登录时间" width="180" />
              <el-table-column label="操作" width="150" fixed="right">
                <template #default="{ row }">
                  <el-button size="small" type="primary" text>
                    <i class="fas fa-edit"></i> 编辑
                  </el-button>
                  <el-button size="small" type="danger" text>
                    <i class="fas fa-trash-alt"></i> 删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            
            <div class="user-actions">
              <el-button type="primary">
                <i class="fas fa-user-plus"></i> 新增用户
              </el-button>
              <el-button type="warning">
                <i class="fas fa-redo-alt"></i> 重置密码
              </el-button>
            </div>
          </div>
        </el-tab-pane>
        
        <!-- 通知设置标签页 -->
        <el-tab-pane label="通知设置" name="notifications">
          <div class="notification-settings">
            <el-form label-position="top">
              <el-form-item>
                <el-checkbox-group v-model="notificationSettings">
                  <el-row :gutter="20">
                    <el-col :span="24" :md="12">
                      <el-checkbox label="emailNotifications">邮件通知</el-checkbox>
                    </el-col>
                    <el-col :span="24" :md="12">
                      <el-checkbox label="systemNotifications">系统通知</el-checkbox>
                    </el-col>
                    <el-col :span="24" :md="12">
                      <el-checkbox label="dataUpdateAlerts">数据更新提醒</el-checkbox>
                    </el-col>
                    <el-col :span="24" :md="12">
                      <el-checkbox label="errorAlerts">错误提醒</el-checkbox>
                    </el-col>
                    <el-col :span="24" :md="12">
                      <el-checkbox label="weeklyReports">每周报告</el-checkbox>
                    </el-col>
                  </el-row>
                </el-checkbox-group>
              </el-form-item>
              
              <el-form-item>
                <el-button type="primary" @click="saveNotificationSettings">
                  <i class="fas fa-save"></i> 保存设置
                </el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script lang="ts">
export default {
  methods: {
    getRoleType(role: string) {
      const roleMap: Record<string, string> = {
        '管理员': 'primary',
        '分析师': 'success',
        '编辑': 'warning',
        '测试用户': 'info'
      }
      return roleMap[role] || 'default'
    }
  }
}
</script>

<style scoped>
.system-settings-page {
  padding: 20px;
}

.page-header {
  margin-bottom: 20px;
}

.page-header h1 {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 24px;
  margin: 0;
}

.settings-card {
  margin-bottom: 20px;
}

.settings-form {
  padding: 20px 0;
}

.user-management {
  padding: 20px 0;
}

.user-actions {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}

.notification-settings {
  padding: 20px 0;
}

@media (max-width: 768px) {
  .system-settings-page {
    padding: 10px;
  }
  
  .page-header h1 {
    font-size: 20px;
  }
  
  .user-actions {
    flex-direction: column;
  }
}
</style>