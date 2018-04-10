import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './index.module.css';
import { MODULAR_TYPE, NAME } from '../../../constants';
import Normal from '../Modular/normal';

class Preview extends Component {
    render() {
        let { cards, currentCardsIndex, currentVideoIndex } = this.props;
        let card = cards[currentCardsIndex] ? cards[currentCardsIndex] : [];
        let videos = card.videos ? card.videos : [];

        let preModule = '';
        // 不同模板启用不同方式
        switch (card.layoutId) {
            case MODULAR_TYPE.VERTICAL:
                preModule = (<Normal type={card.layoutId} videos={videos} currentVideoIndex={currentVideoIndex} editVideo={this.props.editVideo} sliderWidth={232} sliderHeight={309}/>);
                break;
            case MODULAR_TYPE.TRANSVERSE:
                preModule = (<Normal type={card.layoutId} videos={videos} currentVideoIndex={currentVideoIndex} editVideo={this.props.editVideo} sliderWidth={358} sliderHeight={201}/>);
                break;
            default:
                preModule = (<Normal type={card.layoutId} videos={videos} currentVideoIndex={currentVideoIndex} editVideo={this.props.editVideo} wrapperWidth={505} wrapperHeight={283}/>);
                break;
        }

        return (
            <div className={styles.wrapper}>
                <div className={styles.title}>
                    <p>{NAME.PAGE_PRE}</p>
                    <span>{NAME.CLICK_OPTION}</span>
                </div>
                <div className={styles.content}>
                    {preModule}
                </div>
            </div>
        );
    }
}

export default connect()(Preview);
