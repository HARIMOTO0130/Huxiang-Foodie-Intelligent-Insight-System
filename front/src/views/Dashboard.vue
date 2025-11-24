<template>
  <div class="dashboard-container">
    <!-- 数据概览 -->
    <div class="data-overview">
      <el-row :gutter="20">
        <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
          <el-card shadow="hover" class="data-card">
            <div class="card-content">
              <div class="card-icon">
                <i class="fas fa-users"></i>
              </div>
              <div class="card-info">
                <div class="card-title">注册用户</div>
                <div class="card-value">{{ userStats.registeredUsers }}</div>
                <div class="card-change positive">
                  <i class="fas fa-arrow-up"></i> {{ userStats.registeredChange }}%
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover" class="data-card">
            <div class="card-content">
              <div class="card-icon">
                <i class="fas fa-utensils"></i>
              </div>
              <div class="card-info">
                <div class="card-title">餐厅数量</div>
                <div class="card-value">{{ restaurantStats.totalRestaurants }}</div>
                <div class="card-change positive">
                  <i class="fas fa-arrow-up"></i> {{ restaurantStats.changePercentage }}%
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover" class="data-card">
            <div class="card-content">
              <div class="card-icon">
                <i class="fas fa-comment-dots"></i>
              </div>
              <div class="card-info">
                <div class="card-title">今日评价</div>
                <div class="card-value">{{ commentStats.todayComments }}</div>
                <div class="card-change negative">
                  <i class="fas fa-arrow-down"></i> {{ commentStats.changePercentage }}%
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover" class="data-card">
            <div class="card-content">
              <div class="card-icon">
                <i class="fas fa-chart-line"></i>
              </div>
              <div class="card-info">
                <div class="card-title">活跃度</div>
                <div class="card-value">{{ userStats.activityRate }}%</div>
                <div class="card-change positive">
                  <i class="fas fa-arrow-up"></i> {{ userStats.activityChange }}%
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- 图表区域 -->
    <div class="chart-area">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
          <el-card shadow="hover" class="main-chart">
            <template #header>
              <div class="chart-header">
                <i class="fas fa-chart-bar"></i>
                <span>访问趋势图表</span>
              </div>
            </template>
            <div ref="visitTrendChart" class="chart-container"></div>
          </el-card>
        </el-col>
        <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
          <el-card shadow="hover" class="main-chart">
            <template #header>
              <div class="chart-header">
                <i class="fas fa-pie-chart"></i>
                <span>菜系分布</span>
              </div>
            </template>
            <div ref="cuisinePieChart" class="chart-container"></div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- 数据表格 -->
    <div class="data-table">
      <el-card shadow="hover">
        <template #header>
          <div class="table-header">
            <i class="fas fa-table"></i>
            <span>餐厅排行数据</span>
          </div>
        </template>
        <!-- 表格响应式容器 -->
        <div class="table-responsive">
          <el-table 
            :data="restaurantRanking" 
            :style="{ width: '100%' }"
            :default-sort="{ prop: 'rank', order: 'ascending' }"
          >
            <el-table-column 
              prop="rank" 
              label="排名" 
              width="80"
              fixed
            >
              <template #default="{ row }">
                <el-tag :type="getRankTagType(row.rank)">{{ row.rank }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column 
              prop="name" 
              label="餐厅名称" 
              width="180"
              fixed
            />
            <el-table-column 
              prop="rating" 
              label="评分" 
              width="120"
              class="table-col-rating"
            >
              <template #default="{ row }">
                <el-rate 
                  v-model="row.rating" 
                  disabled 
                  show-score 
                  text-color="#ff9900"
                  :max="5"
                  :texts="['', '', '', '', '']"
                />
              </template>
            </el-table-column>
            <el-table-column 
              prop="cuisine" 
              label="菜系" 
              width="120"
              class="table-col-cuisine"
            />
            <el-table-column 
              prop="visits" 
              label="访问量" 
              width="120"
              class="table-col-visits"
            />
            <el-table-column 
              prop="trend" 
              label="趋势"
              width="150"
              class="table-col-trend"
            >
              <template #default="{ row }">
                <el-progress 
                  :percentage="row.trendValue" 
                  :status="getProgressStatus(row.trendStatus)"
                  :stroke-width="8"
                />
              </template>
            </el-table-column>
            <el-table-column 
              prop="location" 
              label="位置" 
              width="150"
              class="table-col-location"
            />
          </el-table>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import { ElCard, ElRow, ElCol, ElTable, ElTableColumn, ElTag, ElRate, ElProgress } from 'element-plus'
import axios from 'axios'

// 图表引用
const visitTrendChart = ref<HTMLElement | null>(null)
const cuisinePieChart = ref<HTMLElement | null>(null)

// 数据状态
const userStats = ref({
  registeredUsers: 0,
  registeredChange: 0,
  activityRate: 0,
  activityChange: 0
})

const restaurantStats = ref({
  totalRestaurants: 0,
  changePercentage: 0
})

const commentStats = ref({
  todayComments: 0,
  changePercentage: 0
})

const restaurantRanking = ref<any[]>([])

// 页面挂载时初始化
onMounted(() => {
  fetchData()
  initVisitTrendChart()
  initCuisinePieChart()
})

// 获取数据
const fetchData = async () => {
  try {
    // 由于是模拟环境，使用mock数据
    // const [userResponse, restaurantResponse, commentResponse, rankingResponse] = await Promise.all([
    //   axios.get('http://localhost:8000/api/user-stats'),
    //   axios.get('http://localhost:8000/api/restaurant-stats'),
    //   axios.get('http://localhost:8000/api/comment-stats'),
    //   axios.get('http://localhost:8000/api/restaurant-ranking')
    // ])
    
    // 使用模拟数据
    userStats.value = {
      registeredUsers: 12800,
      registeredChange: 12.5,
      activityRate: 85.3,
      activityChange: 5.2
    }
    
    restaurantStats.value = {
      totalRestaurants: 568,
      changePercentage: 8.3
    }
    
    commentStats.value = {
      todayComments: 1234,
      changePercentage: 3.1
    }
    
    restaurantRanking.value = generateMockRankingData()
  } catch (error) {
    console.error('获取数据失败:', error)
  }
}

// 初始化访问趋势图表
const initVisitTrendChart = () => {
  if (!visitTrendChart.value || visitTrendChart.value.clientWidth === 0 || visitTrendChart.value.clientHeight === 0) {
    // 延迟初始化，确保DOM已渲染完成
    setTimeout(initVisitTrendChart, 100)
    return
  }
  
  const chart = echarts.init(visitTrendChart.value)
  
  // 根据屏幕宽度获取响应式配置
  const getResponsiveOption = () => {
    const isXSmall = window.innerWidth <= 480
    const isSmall = window.innerWidth <= 576
    const isMobile = window.innerWidth <= 768
    const isTablet = window.innerWidth <= 992
    
    // 根据不同屏幕尺寸设置字体大小
    let titleFontSize = 16
    let legendFontSize = 14
    let axisLabelFontSize = 12
    let gridBottom = '15%'
    
    if (isXSmall) {
      titleFontSize = 12
      legendFontSize = 10
      axisLabelFontSize = 8
      gridBottom = '25%'
    } else if (isSmall) {
      titleFontSize = 13
      legendFontSize = 11
      axisLabelFontSize = 9
      gridBottom = '22%'
    } else if (isMobile) {
      titleFontSize = 14
      legendFontSize = 12
      axisLabelFontSize = 10
      gridBottom = '20%'
    } else if (isTablet) {
      titleFontSize = 15
      legendFontSize = 13
      axisLabelFontSize = 11
      gridBottom = '18%'
    }
    
    return {
      title: {
        text: '月度访问趋势',
        left: 'center',
        textStyle: {
          fontSize: titleFontSize
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
      },
      legend: {
        data: ['访问量', '新增用户'],
        textStyle: {
          fontSize: legendFontSize
        },
        // 在移动端调整图例位置为顶部居中
        top: isMobile ? '15%' : 'auto',
        bottom: isMobile ? 'auto' : 0,
        orient: 'horizontal'
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: gridBottom,
        top: isMobile ? '30%' : '10%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        axisLabel: {
          fontSize: axisLabelFontSize,
          // 根据不同屏幕尺寸优化标签显示
          interval: isXSmall ? 3 : isSmall ? 2 : isMobile ? 1 : 0,
          rotate: isXSmall ? 60 : isSmall ? 45 : isMobile ? 30 : 0
        }
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          fontSize: axisLabelFontSize
        }
      },
      series: [
        {
          name: '访问量',
          type: 'line',
          stack: '总量',
          smooth: true,
          data: [1200, 1900, 3000, 2400, 2700, 3800, 4200, 4600, 5200, 5800, 6300, 6800],
          symbolSize: isXSmall ? 3 : isSmall ? 4 : isMobile ? 5 : 6
        },
        {
          name: '新增用户',
          type: 'line',
          stack: '总量',
          smooth: true,
          data: [300, 500, 800, 700, 900, 1200, 1400, 1600, 1800, 2100, 2300, 2500],
          symbolSize: isXSmall ? 3 : isSmall ? 4 : isMobile ? 5 : 6
        }
      ]
    }
  }
  
  // 首次设置选项
  chart.setOption(getResponsiveOption())
  
  // 响应式调整函数
  const handleResize = () => {
    chart.resize()
    // 重新设置响应式选项
    chart.setOption(getResponsiveOption())
  }
  
  // 添加窗口大小变化监听
  window.addEventListener('resize', handleResize)
  
  // 组件卸载时移除监听
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
    chart.dispose()
  })
}

// 初始化菜系分布图表
  const initCuisinePieChart = () => {
    if (!cuisinePieChart.value || cuisinePieChart.value.clientWidth === 0 || cuisinePieChart.value.clientHeight === 0) {
      // 延迟初始化，确保DOM已渲染完成
      setTimeout(initCuisinePieChart, 100)
      return
    }
    
    const chart = echarts.init(cuisinePieChart.value)
    
    // 根据屏幕宽度获取响应式配置
  const getResponsiveOption = () => {
    const isXSmall = window.innerWidth <= 480
    const isSmall = window.innerWidth <= 576
    const isMobile = window.innerWidth <= 768
    const isTablet = window.innerWidth <= 992
    const isSmallScreen = window.innerWidth <= 1200
    
    // 根据不同屏幕尺寸设置字体大小
    let titleFontSize = 16
    let legendFontSize = 14
    let labelFontSize = 12
    
    if (isXSmall) {
      titleFontSize = 12
      legendFontSize = 10
      labelFontSize = 8
    } else if (isSmall) {
      titleFontSize = 13
      legendFontSize = 11
      labelFontSize = 9
    } else if (isMobile) {
      titleFontSize = 14
      legendFontSize = 12
      labelFontSize = 10
    } else if (isTablet) {
      titleFontSize = 15
      legendFontSize = 13
      labelFontSize = 11
    }
    
    // 根据屏幕大小调整饼图大小
    let pieRadius = ['40%', '75%']
    if (isXSmall) {
      pieRadius = ['25%', '75%']
    } else if (isSmall) {
      pieRadius = ['30%', '75%']
    } else if (isMobile) {
      pieRadius = ['35%', '75%']
    } else if (isTablet) {
      pieRadius = ['38%', '75%']
    }
      
      return {
        title: {
          text: '菜系分布',
          left: 'center',
          textStyle: {
            fontSize: titleFontSize,
            fontWeight: 'bold'
          },
          top: '5%'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          borderColor: '#fff',
          textStyle: {
            color: '#fff'
          }
        },
        legend: {
          orient: isSmallScreen ? 'horizontal' : 'vertical',
          left: isXSmall || isSmall ? '10%' : isMobile ? 'center' : 'right', // 调整图例位置避免重叠
          bottom: isSmallScreen ? '5%' : 'center',
          top: isXSmall ? '85%' : isSmall ? '82%' : isSmallScreen ? '80%' : 'center',
          textStyle: {
            fontSize: legendFontSize,
            color: '#606266'
          },
          // 调整图例项间距
          itemGap: 10,
          // 图例项宽度
          itemWidth: 14,
          itemHeight: 14
        },
        series: [
          {
            name: '菜系',
            type: 'pie',
            radius: pieRadius,
            center: ['50%', isSmallScreen ? '45%' : '50%'],
            avoidLabelOverlap: true, // 设置为true避免标签重叠
            data: [
              { value: 35, name: '湘菜' },
              { value: 25, name: '川菜' },
              { value: 20, name: '粤菜' },
              { value: 10, name: '江浙菜' },
              { value: 10, name: '其他' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 15,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.6)'
              },
              scaleSize: 10 // 减小放大尺寸避免过大
            },
            // 优化标签设置
            label: {
              show: !isMobile, // 移动端不显示标签
              position: 'outside',
              fontSize: labelFontSize,
              // 更智能的标签显示
              formatter: function(params: any) {
                // 只在饼图扇区足够大时显示标签
                return params.value >= 15 ? '{b}\n{d}%' : '';
              },
              // 只有在足够空间时才显示标签
              hideOverlap: true,
              // 标签距离
            distance: isXSmall ? 8 : isSmall ? 10 : isMobile ? 12 : isSmallScreen ? 15 : 20,
              // 添加标签背景
              backgroundColor: 'transparent',
              borderColor: 'transparent'
            },
            // 标签线设置
              labelLine: {
                show: !isXSmall && !isSmall, // 在极小屏幕上不显示标签线，小屏幕可以显示
                length: isXSmall ? 8 : isSmall ? 10 : isMobile ? 12 : isSmallScreen ? 15 : 20,
                length2: isXSmall ? 6 : isSmall ? 8 : isMobile ? 10 : isSmallScreen ? 12 : 15,
              smooth: true,
              lineStyle: {
                width: 1
              }
            },
            // 优化饼图样式
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 2,
              // 使用更和谐的颜色
              color: function(params: any) {
                const colors = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de'];
                return colors[params.dataIndex];
              }
            }
          }
        ]
      }
    }
    
    // 首次设置选项
    chart.setOption(getResponsiveOption())
    
    // 响应式调整函数
    const handleResize = () => {
      chart.resize()
      // 重新设置响应式选项
      chart.setOption(getResponsiveOption())
    }
    
    // 添加窗口大小变化监听
    window.addEventListener('resize', handleResize)
    
    // 组件卸载时移除监听
    onUnmounted(() => {
      window.removeEventListener('resize', handleResize)
      chart.dispose()
    })
  }

// 获取排名标签类型
const getRankTagType = (rank: number) => {
  if (rank === 1) return 'danger'
  if (rank === 2) return 'warning'
  if (rank === 3) return 'success'
  return 'info'
}

// 获取进度条状态
const getProgressStatus = (status: string): "" | "success" | "warning" | "exception" => {
  // 确保返回ElProgress组件接受的有效值
  const validStatuses: ("" | "success" | "warning" | "exception")[] = ['', 'success', 'warning', 'exception'];
  // 将danger转换为exception，其他值如果无效则返回空字符串
  if (status === 'danger') return 'exception';
  return validStatuses.includes(status as any) ? (status as "" | "success" | "warning" | "exception") : '';
}

// 生成模拟排名数据
const generateMockRankingData = () => {
  const data = []
  const cuisines = ['湘菜', '川菜', '粤菜', '江浙菜', '徽菜', '闽菜']
  const locations = ['长沙', '株洲', '湘潭', '衡阳', '岳阳', '常德']
  const names = [
    '老长沙口味虾', '炊烟时代', '火宫殿', '玉楼东', '长沙米粉', '徐记海鲜',
    '费大厨辣椒炒肉', '农耕记', '望湘园', '湘鄂情'
  ]
  
  for (let i = 0; i < 10; i++) {
    const rating = (4 + Math.random() * 1).toFixed(1)
    const trendValue = Math.floor(Math.random() * 100)
    const trendStatus = trendValue > 50 ? 'success' : trendValue > 20 ? 'warning' : 'exception'
    
    data.push({
      rank: i + 1,
      name: names[i],
      cuisine: cuisines[Math.floor(Math.random() * cuisines.length)],
      location: locations[Math.floor(Math.random() * locations.length)],
      rating: parseFloat(rating),
      visits: Math.floor(1000 + Math.random() * 9000),
      trendValue,
      trendStatus
    })
  }
  
  return data.sort((a, b) => a.rank - b.rank)
}
</script>

<style scoped>
.dashboard-container {
  padding: 20px;
  background-color: #f5f7fa;
  min-height: calc(100vh - 60px); /* 减去顶部导航栏高度 */
  box-sizing: border-box;
}

/* 响应式容器调整 */
@media (max-width: 768px) {
  .dashboard-container {
    padding: 15px 10px;
  }
}

@media (max-width: 480px) {
  .dashboard-container {
    padding: 10px 5px;
  }
}

.data-overview {
  margin-bottom: 20px;
}

.data-card {
  transition: all 0.3s ease;
}

.data-card:hover {
  transform: translateY(-5px);
}

.card-content {
  display: flex;
  align-items: center;
  padding: 15px 0;
}

.card-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #ecf5ff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  font-size: 24px;
  color: #409eff;
}

/* 响应式数据卡片图标大小 */
@media (max-width: 480px) {
  .card-icon {
    width: 48px;
    height: 48px;
    font-size: 20px;
    margin-right: 15px;
  }
}

.card-info {
  flex: 1;
}

.card-title {
  font-size: 14px;
  color: #606266;
  margin-bottom: 5px;
}

.card-value {
  font-size: 28px;
  font-weight: bold;
  color: #303133;
  margin-bottom: 5px;
}

/* 响应式数据卡片字体大小 */
@media (max-width: 480px) {
  .card-value {
    font-size: 24px;
  }
  
  .card-title {
    font-size: 12px;
  }
  
  .card-change {
    font-size: 12px;
  }
}

.card-change {
  font-size: 14px;
}

.card-change.positive {
  color: #67c23a;
}

.card-change.negative {
  color: #f56c6c;
}

.chart-area {
  margin-bottom: 20px;
}

/* 图表容器样式 - 确保所有图表大小一致 */
.main-chart {
  height: 400px; /* 统一高度 */
  position: relative;
  margin-bottom: 20px;
  width: 100%; /* 确保宽度一致 */
}

/* 移除最后一个图表卡片的底部边距 */
.chart-area > .el-row > .el-col:last-child > .main-chart {
  margin-bottom: 0;
}

/* 响应式图表高度 */
@media (max-width: 768px) {
  .main-chart {
    height: 300px;
  }
}

@media (max-width: 480px) {
  .main-chart {
    height: 250px;
  }
}

.chart-header {
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  color: #303133;
}

.chart-header i {
  margin-right: 8px;
  color: #409eff;
}

.chart-container {
    width: 100%;
    min-height: 350px;
    /* 添加宽高比以维持图表比例 */
    aspect-ratio: 16/9;
    /* 确保在小屏幕上不会过高 */
    max-height: 450px;
  }

  @media (max-width: 992px) {
    .chart-container {
      min-height: 320px;
      aspect-ratio: 14/9;
    }
  }

  @media (max-width: 768px) {
    .chart-container {
      min-height: 300px;
      aspect-ratio: 12/9;
      max-height: 400px;
    }
  }

  @media (max-width: 576px) {
    .chart-container {
      min-height: 280px;
      aspect-ratio: 1/1;
      max-height: 350px;
    }
  }

  @media (max-width: 480px) {
    .chart-container {
      min-height: 250px;
      /* 在极小屏幕上使用更高的高度以确保可读性 */
      aspect-ratio: 3/4;
      max-height: 300px;
    }
  }

.table-header {
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  color: #303133;
}

.table-header i {
  margin-right: 8px;
  color: #409eff;
}

.data-table {
  margin-bottom: 20px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: -ms-autohiding-scrollbar;
}

/* 表格响应式容器 */
.table-responsive {
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  /* 添加滚动条样式 */
  scrollbar-width: thin;
  scrollbar-color: #c0c4cc #f5f7fa;
}

/* Chrome, Edge, Safari滚动条样式 */
.table-responsive::-webkit-scrollbar {
  height: 6px;
}

.table-responsive::-webkit-scrollbar-track {
  background: #f5f7fa;
  border-radius: 3px;
}

.table-responsive::-webkit-scrollbar-thumb {
  background: #c0c4cc;
  border-radius: 3px;
}

.table-responsive::-webkit-scrollbar-thumb:hover {
  background: #909399;
}

/* 小屏幕下表格样式调整 */
@media (max-width: 768px) {
  /* 在中等屏幕上隐藏部分非关键列 */
  .table-col-location,
  .table-col-trend {
    display: none;
  }
  
  /* 调整表格列宽 */
  .el-table-column {
    padding: 0 !important;
  }
  
  /* 调整表格字体大小 */
  .el-table {
    font-size: 13px;
  }
  
  /* 调整评分组件大小 */
  .el-rate {
    --el-rate-icon-size: 14px;
    margin-bottom: 4px;
  }
  
  /* 调整进度条高度 */
  .el-progress-bar__outer {
    height: 6px !important;
  }
}

@media (max-width: 480px) {
  /* 在小屏幕上隐藏更多列 */
  .table-col-location,
  .table-col-trend,
  .table-col-visits,
  .table-col-cuisine {
    display: none;
  }
  
  /* 进一步缩小表格字体 */
  .el-table {
    font-size: 12px;
  }
  
  /* 固定列宽度调整 */
  .el-table__fixed {
    height: calc(100% - 20px) !important;
  }
  
  /* 优化标签大小 */
  .el-tag {
    padding: 2px 6px;
    font-size: 11px;
  }
}
</style>