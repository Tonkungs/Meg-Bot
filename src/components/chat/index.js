/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import ContentEditable from 'react-contenteditable'
import sanitizeHtml from "sanitize-html";
// import PropTypes from 'prop-types';
import './stylesheet.css'
import './conversation.css'
import './messages.css'
import './button.css'
import './switch.css'

class Chat extends React.Component {

    sanitizeConf = {
        allowedTags: [],
        allowedAttributes: {}
    };

    constructor(props) {
        super(props);
        this.ContentEditable = React.createRef()
        this.setInputCheckbox = this.setInputCheckbox.bind(this)
        this.pressAnswer = this.pressAnswer.bind(this)
        this.keyPress = this.keyPress.bind(this);
        this.state = {
            html: "Hello ",
            is_bot: false,
            conversation_list: [
                {
                    active: true,
                    people_id: 1,
                    is_own: false,
                    display_photo: "https://via.placeholder.com/50",
                    display_name: "Tonkung",
                    update_at: "2019-06-26",
                    last_text: "ขอสอบถามหน่อยครับ"
                },
                {
                    active: false,
                    people_id: 2,
                    is_own: false,
                    display_photo: "https://via.placeholder.com/50",
                    display_name: "Mamoe",
                    update_at: "2019-06-25",
                    last_text: "ราคาเท่าไรครับ"
                }
            ],
            messages_list: [
                {
                    active: true,
                    people_id: 1,
                    is_own: false,
                    display_photo: "https://via.placeholder.com/50",
                    display_name: "Tonkung",
                    update_at: "2019-06-26",
                    text: "ขอสอบถามหน่อยครับ ว่าตัวนี้ราคาเท่าใด"
                },
                {
                    active: false,
                    people_id: 2,
                    is_own: true,
                    display_photo: "https://via.placeholder.com/50",
                    display_name: "Mamoe",
                    update_at: "2019-06-25",
                    text: "ราคา 500 บาทครับfffffffffffffffffffff"
                }
            ]
        }
    }

    handleChange = evt => {
        const html = sanitizeHtml(evt.target.value, this.sanitizeConf)
        this.setState({ html });
    };

    keyPress = (e) => {
        // เมือกด enter
        if (e.keyCode === 13) {
            this.pressAnswer()
        }
    }

    setInputCheckbox = evt => {
        // console.log('evt',evt.target.defaultChecked);
        this.setState({ is_bot: !evt.target.defaultChecked });
    }

    pressAnswer = () => {
        const { messages_list, html } = this.state
        this.setState({
            messages_list: [...messages_list,
            {
                active: false,
                people_id: 2,
                is_own: true,
                display_photo: "https://via.placeholder.com/50",
                display_name: "Mamoe",
                update_at: new Date().toISOString(),
                text: html
            }
            ]
        });
        this.setState({ html: "" });
    }

    render = () => {
        const { html, conversation_list, messages_list, is_bot } = this.state;
        return (<React.Fragment>
            <div className="conversation-contaner">
                <div className="conversation-list">
                    <div className="filter-name">
                        <input type="text" name="filter-name" id="filter-name" placeholder="ค้นหารายชื่อทั้งหมด" />
                    </div>
                    <ul>
                        {
                            conversation_list.forEach((item) => {
                                const { active, display_photo, display_name, update_at, last_text } = item
                                return <li active={active.toString()} key={`${display_name}-${active}`}>
                                    <div className="display">
                                        <div className="photo">
                                            <img src={display_photo} alt={display_name.toString()} />
                                        </div>
                                        <div className="display-text">
                                            <div className="display-name">
                                                <div className="name">
                                                    <h5 >{display_name}</h5>
                                                    <div className="time">{update_at}</div>
                                                </div>
                                            </div>
                                            <div className="text">
                                                {last_text}
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            })
                        }
                    </ul>
                </div>
                <div className="messages">
                    <div className="messages-type">
                        <div className="messages-switch">
                            <div className="switch-text">
                                <h5>คน</h5>
                            </div>
                            <div className="switch-text">
                                <label className="switch" onClick={this.setInputCheckbox}>
                                    <input type="checkbox" defaultChecked={is_bot} onClick={this.setInputCheckbox} />
                                    <span className="slider round" />
                                </label>
                            </div>
                            <div className="switch-text">
                                <h5>Bot</h5>
                            </div>
                        </div>
                    </div>
                    <div className="messages-show">
                        {
                            messages_list.forEach(items => {
                                const { is_own , display_name, update_at, text } = items
                                if (is_own === true) {
                                    return (
                                        <div className="message-box-own" key={`${display_name}-${update_at}`}>
                                            <div className="display-text">
                                                <div className="text">
                                                    {text}
                                                </div>
                                                <div className="text-time">
                                                    <h5 >{update_at}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                if (is_own === false) {
                                    return (
                                        <div className="message-box" key={`${display_name}-${update_at}`}>
                                            <div className="photo-display">
                                                <img src="https://via.placeholder.com/50" alt="Tonkung" />
                                            </div>
                                            <div className="display-text">
                                                <div className="display-name">
                                                    <h5>{display_name}</h5>
                                                </div>
                                                <div className="text">
                                                    {text}
                                                </div>
                                                <div className="text-time">
                                                    <h5>{update_at}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                return 'ไม่พบข้อมูล'
                            })
                        }
                    </div>
                    <div className="messages-input">
                        <ContentEditable
                            className="messages-input-text"
                            innerRef={this.contentEditable}
                            html={html} // innerHTML of the editable div
                            disabled={false}       // use true to disable editing
                            onChange={this.handleChange} // handle innerHTML change
                            onKeyDown={this.keyPress}
                            tagName='article' // Use a custom HTML tag (uses a div by default)
                        />
                        <input type="button" defaultValue="ส่ง" className="button button-green" onClick={this.pressAnswer} />
                    </div>
                </div >
            </div >

        </React.Fragment>
        )
    }
}
// Chat.propTypes = {
//     // children: PropTypes.string.isRequired,
//     html: PropTypes.string.isRequired,
//     conversation_list: PropTypes.Array
// }
export default Chat;

