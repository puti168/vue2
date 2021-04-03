
import { formatNumber } from '@/utils/util'
/**
 * 分页mixin
 * 使用参考：views\manager\rate\template\index.vue
 */
const paginationMixin = {
  data() {
    return {
      total: 0,
      pageSize: 10,
      page: 1,
      sorter: {}
    }
  },
  methods: {
    fetch() {
      console.error("need override fetch method");
    },
    onTableChange(pagination, filter, sorter = {}) {
      this.sorter = sorter
      this.fetch(pagination.current, pagination.pageSize)
    },
  },
  computed: {
    pagination() {
      return {
        total: this.total,
        size: 'middle',
        defaultPageSize: this.pageSize,
        current: this.page,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['10', '20', '50', '100'], //每页中显示的数据
        showTotal: () => {
          return `共 ${formatNumber(this.total, 0, 0)} 条记录`
        },
      }
    },
  },
}

export default paginationMixin
