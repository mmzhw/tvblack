import React, { Component } from 'react';
import { connect } from 'react-redux';
import Swiper from 'swiper';
import styles from './index.module.css';
import 'swiper/dist/css/swiper.min.css';
import { handleImgUrl } from '../../../utils/tools';
import { MODULAR_TYPE } from '../../../constants';

class Normal extends Component {
    componentDidUpdate(prevProps, prevState) {
        if (this.mySwiper) {
            this.mySwiper.detachEvents();
            this.mySwiper = null;
        }
        let option = {
            initialSlide: this.props.currentVideoIndex,
        };
        if (this.props.type === MODULAR_TYPE.BANNER) {
            // banner模板和普通模板配置区分
            option.pagination = {
                el: '.swiper-pagination',
                clickable: true,
                bulletElement: 'li',
            };
        } else {
            option.spaceBetween = 20;
            option.slidesPerView = 'auto';
            option.navigation = {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            };
        }
        this.mySwiper = new Swiper('.swiper-container', option);
    }

    componentWillUnmount() {
        if (this.mySwiper) {
            this.mySwiper.detachEvents();
            this.mySwiper = null;
        }
    }

    // 控制最外层大小
    controlWidth() {
        if (this.props.wrapperWidth && this.props.wrapperHeight) {
            return {
                width: this.props.wrapperWidth,
                height: this.props.wrapperHeight,
            };
        } else {
            if (this.refs.verticalWrapper) {
                return {
                    width: this.refs.verticalWrapper.scrollWidth * 0.9,
                    minHeight: 300,
                };
            } else {
                return {
                    width: 500,
                    minHeight: 300,
                };
            }
        }
    }

    render() {
        return (
            <div className={styles.wrapper} ref='verticalWrapper'>
                <div className={`swiper-container ${styles.swiperWrapper}`} style={this.controlWidth()}>
                    <div className='swiper-wrapper'>
                        {
                            this.props.videos && this.props.videos.map((video, index) => {
                                let imageUrl = require('../../../assets/none.png');
                                if (video.imageUrl) {
                                    imageUrl = handleImgUrl(video.imageUrl);
                                }
                                let width = this.props.sliderWidth || 'auto';
                                let height = this.props.sliderHeight || 'auto';
                                return (
                                    <div
                                        className={`swiper-slide ${styles.imageWrapper}`}
                                        style={{ width: width, height: height }}
                                        key={index}
                                        onClick={() => { this.props.editVideo(index); }}>
                                        <img alt={video.name} src={imageUrl}/>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
                {
                    this.props.type === MODULAR_TYPE.BANNER ? (
                        <div className= {`swiper-pagination ${styles.pagination}`}/>
                    ) : null
                }

                {
                    this.props.type !== MODULAR_TYPE.BANNER ? (
                        <div className='swiper-button-prev'/>
                    ) : null
                }

                {
                    this.props.type !== MODULAR_TYPE.BANNER ? (
                        <div className='swiper-button-next'/>
                    ) : null
                }

            </div>
        );
    }
}

export default connect()(Normal);
