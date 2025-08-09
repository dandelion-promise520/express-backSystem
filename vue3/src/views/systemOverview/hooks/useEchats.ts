import { onMounted, type Ref } from "vue";
import * as echarts from 'echarts';
type EChartsOption = echarts.EChartsOption;

// 管理与用户对比图图表
export const useContrastChartDom = (contrastChartDom: Ref<HTMLElement | null, HTMLElement | null>) => {
    onMounted(() => {
        if (contrastChartDom.value) { // 检查 contrastChartDom 是否为 null
            let option: EChartsOption;
            let myChart = echarts.init(contrastChartDom.value);

            // 图表主体
            option = {
                title: {
                    text: '管理与用户对比图',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left'
                },
                series: [
                    {
                        type: 'pie',
                        radius: '50%',
                        data: [
                            { value: 1, name: '超级管理员' },
                            { value: 1, name: '产品管理员' },
                            { value: 0, name: '用户管理员' },
                            { value: 6, name: '用户' },
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };

            option && myChart.setOption(option);
        } else {
            console.warn('对比图的 DOM 元素未找到，请检查引用'); // 可选：输出警告
        }
    })
}

// 管理类别库存总价图
export const usetotalPriceChartDom = (totalPriceChartDom: Ref<HTMLElement | null, HTMLElement | null>) => {
    onMounted(() => {
        let option: EChartsOption;
        let myChart = echarts.init(totalPriceChartDom.value);

        // 图表主体
        option = {
            xAxis: {
                type: 'category',
                data: ['食品类', '服装类', '鞋帽类', '日用品类']
            },
            yAxis: {
                name: '产品类别库存总价图',
                nameTextStyle: {
                    color: "#000",
                    fontSize: "16",
                    padding: [0, 0, 15, 0]
                },
                type: 'value',
                max: 18000,
            },
            series: [
                {
                    data: [
                        13000,
                        {
                            value: 15000,
                            itemStyle: {
                                color: '#a90000'
                            }
                        },
                        10000,
                        {
                            value: 5000,
                            itemStyle: {
                                color: '#ee6565'
                            }
                        }
                    ],
                    type: 'bar',
                    barWidth: '20%'
                }
            ]
        };
        option && myChart.setOption(option);
    })
}


// 公告等级分布图
export const usegradeChartDom = (gradeChartDom: Ref<HTMLElement | null, HTMLElement | null>) => {
    onMounted(() => {
        let option: EChartsOption;
        let myChart = echarts.init(gradeChartDom.value);

        // 图表主体
        option = {
            title: {
                text: '公告等级分布图',
                left: 'left',
                top: '5%',
                textStyle: {
                    fontSize: 16,
                    fontWeight: 'normal',
                    color: '#000'
                }
            },
            tooltip: {
                trigger: 'item',
            },
            legend: {
                top: '5%',
                left: 'center',

            },
            series: [
                {
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: 10,
                        borderColor: '#fff',
                        borderWidth: 2
                    },
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: 40,
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [
                        { value: 0, name: '一般' },
                        { value: 5, name: '重要' },
                        { value: 5, name: '必要' },
                    ]
                }
            ]
        };
        option && myChart.setOption(option);
    })
}


// 每日登录人数图
export const useloginChartDom = (loginChartDom: Ref<HTMLElement | null, HTMLElement | null>) => {
    onMounted(() => {
        let option: EChartsOption;
        let myChart = echarts.init(loginChartDom.value);

        // 获取当前日期
        const today = new Date();
        const sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(today.getDate() - 6); // 获取七天前的日期

        // 创建日期数组
        const dateList = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(sevenDaysAgo);
            date.setDate(sevenDaysAgo.getDate() + i);
            dateList.push(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);
            // 格式化为“年份-月-日”
        }

        // 登录人数数据（这里可以根据实际情况随机生成或请求数据）
        const loginData = [11, 12, 15, 13, 14, 12, 10]; // 仅作示例

        // 图表主体
        option = {
            title: {
                text: '每日登录人数图',
                left: 'left',
                top: '5%',
                textStyle: {
                    fontSize: 16,
                    fontWeight: 'normal',
                    color: '#000'
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross'
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: dateList // 使用动态生成的日期数据
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '登录人数',
                    type: 'line',
                    data: loginData // 使用动态的登录人数数据
                }
            ]
        };

        option && myChart.setOption(option);
    })
}
