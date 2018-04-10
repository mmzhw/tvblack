import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './index.module.css';
import { Button } from 'antd';
import Sortable from 'sortablejs';
import { NAME } from '../../../constants';

class LeftMenu extends Component {
    componentDidUpdate() {
        let self = this;

        Sortable.create(this.refs.groups, {
            animation: 150,
            filter: '.filterMenu',
            onEnd: (e) => {
                if (e.oldIndex >= self.props.cards.length || e.newIndex >= self.props.cards.length) {
                    return false;
                }
                // self.props.dragChannel(e.oldIndex, e.newIndex, self.props.cards);
            }
        });
    }

    render() {
        return (
            <div className={styles.leftMenu}>
                <div className={styles.title}>
                    <p>{NAME.PAGE_WRAPPER}</p>
                    <span>{NAME.CLICK_MENU}</span>
                </div>
                <div className={styles.content}>
                    <div className={styles.cardList} ref='groups'>
                        {
                            this.props.cards && this.props.cards.map((item, index) => {
                                return (
                                    <div key={index} className={index === 0 ? 'filterMenu' : ''}>
                                        <Button
                                            key={index}
                                            type='default'
                                            className={this.props.currentCardsIndex === index ? styles.buttonActive : styles.buttonNotActive }
                                            onClick={() => { this.props.changeItem(index); }}
                                        >
                                            {item.title}
                                        </Button>
                                    </div>
                                );
                            })
                        }
                    </div>
                    <div className={styles.addButton}>
                        <Button type='default' onClick={this.props.addCard}>{NAME.ADD_MODULE}</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect()(LeftMenu);
