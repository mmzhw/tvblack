import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './index.module.css';
import Sortable from 'sortablejs';
import { Button, Icon } from 'antd';

class Bookshelf extends Component {
    constructor(props) {
        super(props);
        this.dragCardsAreas = [];
    }

    componentDidUpdate() {
        let self = this;

        Sortable.create(this.refs.groups, {
            animation: 150,
            filter: '.addButtonDiv',
            onEnd: (e) => {
                if (e.oldIndex >= self.props.groups.length || e.newIndex >= self.props.groups.length) {
                    return false;
                }
                // self.props.dragChannel(e.oldIndex, e.newIndex, self.props.groups, -1);
            }
        });

        // 一级卡片排序，关键词dragCardsAreas,cards
        this.props.groups.forEach((group, groupIndex) => {
            if (self.dragCardsAreas.length > 0) {
                let subSortArea = this.dragCardsAreas[groupIndex];
                new Sortable(subSortArea, {
                    animation: 150,
                    filter: '.filterMenu',
                    onEnd: function(e) {
                        // self.props.dragChannel(e.oldIndex, e.newIndex, self.props.groups[groupIndex].cards, -3, groupIndex);
                    }
                });
            }
        });
    }

    render() {
        return (
            <div className={styles.bookshelfs} ref='groups'>
                {
                    this.props.groups && this.props.groups.map((group) => {
                        return (
                            <div className={styles.bookshelf} key={group.sort}>
                                <div className={styles.title}>
                                    <p>{group.name}</p>
                                    <span style={{ background: (group.enable === 1) ? '#7ED41A' : '#CCCCCC' }}>{(group.enable === 1) ? '已启用' : '未启用'}</span>
                                    <div className={styles.clear}/>
                                </div>
                                <div className={styles.subTitle}>
                                    <div className={styles.fourP}>模块名称</div>
                                    <div className={styles.twoP}>状态</div>
                                    <div>操作</div>
                                </div>

                                <div className={styles.content} ref={(elem) => { this.dragCardsAreas.push(elem); }}>
                                    {
                                        group && group.cards && group.cards.map((card, cardIndex) => {
                                            return (
                                                <div key={card.sort} className={cardIndex === 0 ? 'filterMenu' : ''}>
                                                    <div className={styles.fourP}>{card.layoutName}</div>
                                                    <div className={styles.twoP}>{(card.isEnable === 1) ? '已启用' : '未启用'}</div>
                                                    <div className={styles.operation}>
                                                        <Button onClick={() => { this.props.toEditChannel(group, cardIndex); }} title='配置模块'>
                                                            <Icon type={'setting'}/>
                                                        </Button>
                                                        <Button onClick={() => { this.props.removeCard(group, cardIndex); }} title='删除模块'>
                                                            <Icon type={'close'}/>
                                                        </Button>
                                                    </div>
                                                    <i className={styles.clear}/>
                                                </div>
                                            );
                                        })
                                    }
                                </div>

                                <div className={styles.footer}>
                                    <Button onClick={() => { this.props.publish(group.id); }} style={{ color: '#009688' }} >审核</Button>
                                    <Button onClick={() => { this.props.editChannel(0, group); }} style={{ color: '#417BFF' }}>编辑名称</Button>
                                    <Button onClick={() => { this.props.removeChannel(group); }} style={{ color: '#FC363E' }}>删除频道</Button>
                                    <Button onClick={() => { this.props.toEditChannel(group); }} style={{ color: '#F57C00' }}>配置模块</Button>
                                    <i className={styles.clear}/>
                                </div>
                            </div>
                        );
                    })
                }
                <div className={`addButtonDiv ${styles.addButtonDiv}`}> <Button className={styles.addButton} onClick={() => { this.props.addChannel(0); }}><Icon type='plus'/></Button></div>

                <div className={styles.clear}/>
            </div>
        );
    }
}

export default connect()(Bookshelf);
