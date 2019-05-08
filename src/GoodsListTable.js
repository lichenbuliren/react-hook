import React, { useState } from 'react'
import { Table, Avatar } from 'antd'
import { fetchGoodsList } from './services'
import { useService } from './hooks'

const columns = [
  {
    title: '商品名称',
    key: 'name',
    dataIndex: 'name',
    render: (name, row) => (
      <React.Fragment>
        <Avatar src={row.img} />
        &nbsp;&nbsp;
        {name}
      </React.Fragment>
    )
  },
  {
    title: '商品价格',
    key: 'price',
    dataIndex: 'price'
  },
  {
    title: '商品库存',
    key: 'stock',
    dataIndex: 'stock'
  },
  {
    title: '创建时间',
    key: 'createTime',
    dataIndex: 'createTime'
  },
  {
    title: '更新时间',
    key: 'updateTime',
    dataIndex: 'updateTime'
  }
]

const GoodsListTable = () => {
  const [pageSize, setPageSize] = useState(10)
  const [pageNo, setPageNo] = useState(1)
  const { loading = false, error, response = {} } = useService(fetchGoodsList, {
    pageSize,
    pageNo
  })

  const { list = [] } = response || {}
  console.log('response', response)

  return (
    <div>
      <Table
        loading={loading}
        dataSource={list}
        columns={columns}
        bordered
        pagination={{
          pageSize,
          current: pageNo,
          onChange: (pageNo, pageSize) => {
            setPageNo(pageNo)
            setPageSize(pageSize)
          }
        }}
        style={{
          width: '80%',
          margin: '0 auto'
        }}
      />
    </div>
  )
}

export default GoodsListTable
