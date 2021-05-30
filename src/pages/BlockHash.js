import React from 'react';
import './BlockHash.css';
import 'antd/dist/antd.css';
import { Input, Descriptions, List, Tag } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import moment from 'moment';
import { addIndex, any, map, reduce } from 'ramda';
import Title from '../components/Title';
import useFetchBlockHash from '../hooks/useFetchBlockHash';

export const BlockDescriptions = ({ data }) => {
    const outSum = (outList) => reduce(
        (acc, out) => acc + (out?.value || 0),
        0,
        outList
    )
    const { time, tx } = data || {};
    return (
        <div>
            <Title tips={`Block at height ${data?.height} in the Bitcoin blockchain`}>Block {data?.block_index}</Title>
            <Descriptions bordered column={1}>
                <Descriptions.Item label="Hash">{data?.hash}</Descriptions.Item>
                <Descriptions.Item label="Confirmations"></Descriptions.Item>
                <Descriptions.Item label="Timestamp">{time ? moment(time * 1000).format('YYYY-MM-DD HH:mm') : ''}</Descriptions.Item>
                <Descriptions.Item label="Height">{data?.height}</Descriptions.Item>
                <Descriptions.Item label="Miner"></Descriptions.Item>
                <Descriptions.Item label="Number of Transactions">{data?.n_tx}</Descriptions.Item>
                <Descriptions.Item label="Difficulty"></Descriptions.Item>
                <Descriptions.Item label="Merkle root">{data?.mrkl_root}</Descriptions.Item>
                <Descriptions.Item label="Version"></Descriptions.Item>
                <Descriptions.Item label="Bits">{data?.bits}</Descriptions.Item>
                <Descriptions.Item label="Weight">{data?.weight}</Descriptions.Item>
                <Descriptions.Item label="Size">{data?.size}</Descriptions.Item>
                <Descriptions.Item label="Nonce">{data?.nonce}</Descriptions.Item>
                <Descriptions.Item label="Transaction Volume"></Descriptions.Item>
                <Descriptions.Item label="Block Reward"></Descriptions.Item>
                <Descriptions.Item label="Fee Reward"></Descriptions.Item>
            </Descriptions>
            <Title tips={`All transactions recorded in Block at height ${data?.height}`}>Block Transactions</Title>
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    pageSize: 10,
                }}
                dataSource={tx || []}
                renderItem={item => (
                    <List.Item>
                        <div className='block-transactions-row block-transactions-hash'>
                            <div>Hash</div>
                            <div className='ellipsis'>{item.hash}</div>
                            <div></div>
                            <div className='text-right'>{moment(item.time * 1000).format('YYYY-MM-DD HH:mm')}</div>
                        </div>
                        <div className='block-transactions-row block-transactions-inputs-out'>
                            <div></div>
                            <div>
                                {any((input) => input?.prev_out, item.inputs) ?
                                    addIndex(map)((input, i) => {
                                        if (input?.prev_out) {
                                            return <div key={i} className='block-transactions-value'>
                                                <div className='ellipsis'>{input?.prev_out?.addr}</div>
                                                <div className='text-right'>{input?.prev_out?.value / 100000000} BTC</div>
                                            </div>
                                        }
                                    }, item.inputs) : 'COINBASE (Newly Generated Coins)'}
                            </div>
                            <div className='text-center'>
                                <ArrowRightOutlined style={{ fontSize: '24px', color: '#08c' }} />
                            </div>
                            <div>
                                {addIndex(map)((out, i) => {
                                    return <div key={i} className='block-transactions-value'>
                                        <div className='ellipsis'>{out?.addr || 'OP_RETURN'}</div>
                                        <div className='text-right'>{out?.value / 100000000} BTC</div>
                                    </div>
                                }, item.out)}
                            </div>
                        </div>
                        <div className='block-transactions-row block-transactions-fee'>
                            <div>Fee</div>
                            <div>{item.fee / 100000000} BTC</div>
                            <div></div>
                            <div className='text-right'>
                                <Tag color="green">{outSum(item.out) / 100000000} BTC</Tag>
                            </div>
                        </div>
                    </List.Item>
                )}
            />
        </div>
    )
}

const BlockHash = () => {
    const [data, loading, onSearch] = useFetchBlockHash();
    return (
        <div className="App">
            <Input.Search
                placeholder='Block Hash'
                onSearch={onSearch}
                loading={loading}
                enterButton='Search'
                size='large'
            />
            <BlockDescriptions data={data} />
        </div>
    );
}

export default BlockHash;
