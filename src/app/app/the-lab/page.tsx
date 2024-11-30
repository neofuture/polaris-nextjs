"use client";

import React, {useState} from 'react';
import NavLink from '@/components/microcomponents/nav-link/nav-link.component';
import Button from '@/components/microcomponents/button/button.component';
import ColorPicker from "@/components/color-picker/color-picker.component";
import ToggleSwitch from "@/components/microcomponents/toggle-switch/toggle-switch.component";
import styles from './lab.module.css';
import Link from "next/link";
import Modal from "@/components/microcomponents/modal/modal.component";
import Image from "next/image";
import Logo from "../../../../public/images/logo.png";
import LogoDark from "../../../../public/images/logo_dark.png";
import {useTheme} from "@/context/ThemeContext";
import {showToast} from "@/components/microcomponents/toast/toast-utils";

function TheLab() {
    const [toggleState, setToggleState] = useState(false);
    const [color, setColor] = useState('purple');
    const [modalStates, setModalStates] = useState({
        isFirstModalOpen: false,
        isSecondModalOpen: false,
        isThirdModalOpen: false,
        isFourthModalOpen: false,
        isFifthModalOpen: false
    });
    const {theme} = useTheme();


    const handleToggle = () => {
        setToggleState(!toggleState);
    };

    const openModal = (modalName: string) => {
        setModalStates(prevState => ({...prevState, [modalName]: true}));
    };

    const closeModal = (modalName: string) => {
        setModalStates(prevState => ({...prevState, [modalName]: false}));
    };

    return (
        <div className={styles['outer-container']}>
            <h1><i className={'fad fa-flask'}/> The Lab</h1>
            <h2>Welcome to The Lab</h2>

            <div className={styles['container']}>
                <div className={styles.section}>
                    <h3>NavLink</h3>
                    <div className={styles['component-container']}>
                        <NavLink onClick={() => alert('NavLink clicked')} iconName={'fa-flask'}>Go to example</NavLink>
                    </div>
                    <div className={styles.documentationBox}>
                        {`<NavLink onClick={handleClick} iconName={'fa-flask'}>Go to example</NavLink>`}
                    </div>
                    <div className={styles.parametersBox}>
                        <h5>Parameters:</h5>
                        <ul>
                            <li><code>iconName</code>: string (optional)</li>
                            <li><code>href</code>: string (optional)</li>
                            <li><code>onClick</code>: function (optional)</li>
                            <li><code>exact</code>: boolean (optional)</li>
                            <li><code>children</code>: React.ReactNode</li>
                        </ul>
                    </div>
                </div>

                <div className={styles.section}>
                    <h3>Button</h3>
                    <div className={styles['component-container']}>
                        <div className={styles['flex-buttons']}>

                            <Button onClick={() => alert('Default Button clicked!')} iconName={'fa-check'}
                                    state={'default'}>Default</Button>
                            <Button onClick={() => alert('Warning Button clicked!')}
                                    iconName={'fa-exclamation-triangle'} state={'warning'}>Warning</Button>
                            <Button onClick={() => alert('Error Button clicked!')} iconName={'fa-times-circle'}
                                    state={'error'}>Error</Button>
                            <Button onClick={() => alert('Disabled Button clicked!')} iconName={'fa-ban'}
                                    state={'disabled'}>Disabled</Button>
                            <Button onClick={() => alert('Success Button clicked!')} iconName={'fa-check-circle'}
                                    state={'success'}>Success</Button>

                            <Button onClick={() => alert('Rounded Button clicked!')} iconName={'fa-user'}
                                    rounded={true}></Button>
                            <Button onClick={() => alert('Rounded Button clicked!')}
                                    iconName={'fa-exclamation-triangle'} state={'warning'} rounded={true}></Button>
                            <Button onClick={() => alert('Rounded Button clicked!')} iconName={'fa-times-circle'}
                                    state={'error'} rounded={true}></Button>
                            <Button onClick={() => alert('Rounded Button clicked!')} iconName={'fa-ban'}
                                    state={'disabled'} rounded={true}></Button>
                            <Button onClick={() => alert('Rounded Button clicked!')} iconName={'fa-check-circle'}
                                    state={'success'} rounded={true}></Button>

                        </div>
                    </div>
                    <div className={styles.documentationBox}>
                        {`<Button onClick={handleClick} iconName={'fa-flask'} state={'warning'}>Click me</Button>`}
                    </div>
                    <div className={styles.parametersBox}>
                        <h5>Parameters:</h5>
                        <ul>
                            <li><code>iconName</code>: string (optional)</li>
                            <li><code>label</code>: string (optional)</li>
                            <li><code>onClick</code>: function (optional)</li>
                            <li><code>rounded</code>: boolean (optional)</li>
                            <li><code>href</code>: string (optional)</li>
                            <li><code>children</code>: React.ReactNode</li>
                            <li>
                                <code>state</code>: &#39;default&#39; | &#39;warning&#39; | &#39;error&#39; | &#39;disabled&#39; | &#39;success&#39; (optional)
                            </li>
                        </ul>
                    </div>
                </div>

                <div className={styles.section}>
                    <h3>Toggle Switch</h3>
                    <div className={styles['component-container']}>

                        <ToggleSwitch initialState={false} onToggle={handleToggle} viewStateOn='On' viewStateOff='Off'/>
                    </div>
                    <div className={styles.documentationBox}>
                        {`<ToggleSwitch initialState={false} onToggle={handleToggle} viewStateOn='On' viewStateOff='Off' />`}
                    </div>
                    <div className={styles.parametersBox}>
                        <h5>Parameters:</h5>
                        <ul>
                            <li><code>initialState</code>: boolean</li>
                            <li><code>onToggle</code>: function</li>
                            <li><code>viewStateOn</code>: string (optional)</li>
                            <li><code>viewStateOff</code>: string (optional)</li>
                        </ul>
                    </div>
                </div>

                <div className={styles.section}>
                    <h3>ColorPicker</h3>
                    <div className={styles['component-container']}>

                        <ColorPicker selectedColor={color} onColorSelect={setColor}/>
                    </div>
                    <div className={styles.documentationBox}>
                        {`<ColorPicker selectedColor={color} onColorSelect={setColor}/>`}
                    </div>
                    <div className={styles.parametersBox}>
                        <h5>Parameters:</h5>
                        <ul>
                            <li><code>selectedColor</code>: string</li>
                            <li><code>onColorSelect</code>: function</li>
                        </ul>
                    </div>
                </div>
                <div className={styles.section}>
                    <h3>Parameterised Routes</h3>
                    <ul>
                        <li>
                            <Link href="/app/the-lab/string1">Slug 1</Link>
                        </li>
                        <li>
                            <Link href="/app/the-lab/string2">Slug 2</Link>
                        </li>
                        <li>
                            <Link href="/app/the-lab/string3">Slug 3</Link>
                        </li>
                    </ul>
                </div>
            </div>

            <div className={styles['container-half']}>

                <div className={styles.section}>
                    <h3>Modal</h3>
                    <div className={styles['flex-buttons']}>
                        <Button onClick={() => openModal('isFirstModalOpen')} iconName='fa-up-right-from-square'>Open
                            First
                            Model</Button>
                        <Button onClick={() => openModal('isSecondModalOpen')} iconName='fa-up-right-from-square'>Open
                            Second Modal (No close button)</Button>
                        <Button onClick={() => openModal('isThirdModalOpen')} iconName='fa-up-right-from-square'>Open
                            Third
                            Modal (Blur close blocked)</Button>
                        <Button onClick={() => openModal('isFourthModalOpen')} iconName='fa-up-right-from-square'>Open
                            Fourth
                            Modal (Auto close 5 seconds)</Button>
                        <Button onClick={() => openModal('isFifthModalOpen')} iconName='fa-up-right-from-square'>Open
                            Fifth
                            Modal (Auto close 20 seconds, with close)</Button>

                    </div>
                    <Modal isOpen={modalStates.isFirstModalOpen}
                           onClose={() => closeModal('isFirstModalOpen')}>
                        <h2>Modal Title</h2>
                        <div>This is a basic modal component.</div>
                    </Modal>
                    <Modal isOpen={modalStates.isSecondModalOpen}
                           onClose={() => closeModal('isSecondModalOpen')}
                           showCloseButton={false}>
                        <h2>Second Modal Title</h2>
                        <div>This is the second modal component.</div>
                    </Modal>
                    <Modal isOpen={modalStates.isThirdModalOpen}
                           onClose={() => closeModal('isThirdModalOpen')}
                           showCloseButton={true}
                           allowBlurClose={false}>
                        <h2>Third Modal Title</h2>
                        <div>This is the second modal component.</div>
                        <hr></hr>
                        <Image src={theme === 'light' ? LogoDark : Logo} alt={'Hoops'} width={442} height={234}/>
                    </Modal>
                    <Modal isOpen={modalStates.isFourthModalOpen}
                           onClose={() => closeModal('isFourthModalOpen')}
                           showCloseButton={false}
                           allowBlurClose={false}
                           closeTimer={5000}>
                        <Image src={theme === 'light' ? LogoDark : Logo} alt={'Hoops'} width={442} height={234}/>
                    </Modal>
                    <Modal isOpen={modalStates.isFifthModalOpen}
                           onClose={() => closeModal('isFifthModalOpen')}
                           showCloseButton={true}
                           allowBlurClose={false}
                           closeTimer={20000}>
                        <Image src={theme === 'light' ? LogoDark : Logo} alt={'Hoops'} width={442} height={234}/>
                    </Modal>

                    <div className={styles.documentationBox}>
                        <div>{`<Button onClick={() => openModal('isFirstModalOpen')} iconName='fa-up-right-from-square'>Open Model</Button>`}</div>
                        <div>&nbsp;</div>
                        <div>{`<Modal isOpen={modalStates.isFirstModalOpen} onClose={() => closeModal('isFirstModalOpen')} showCloseButton={true} allowBlurClose={true}>`}</div>
                        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`<h2>Modal Title</h2>`}</div>
                        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`<div>This is a basic modal component.</div>`}</div>
                        <div>{`</Modal>`}</div>
                    </div>
                    <div className={styles.parametersBox}>
                        <h5>Parameters:</h5>
                        <ul>
                            <li><code>isOpen</code>: boolean</li>
                            <li><code>onClose</code>: function</li>
                            <li><code>showCloseButton</code>: boolean (optional)</li>
                            <li><code>allowBlurClose</code>: boolean (optional)</li>
                            <li><code>children</code>: React.ReactNode</li>
                            <li><code>closeTimer</code>: number (optional)</li>
                        </ul>
                    </div>
                </div>
                <div className={styles.section}>
                    <h3>Toasts</h3>
                    <div className={styles['flex-buttons']}>
                        <Button onClick={() => showToast('Title', 'Message', 'default', undefined,)} state={'default'}>Show
                            Toast</Button>
                        <Button onClick={() => showToast('Title', 'Message', 'warning', undefined)} state={'warning'}>Show
                            Toast</Button>
                        <Button onClick={() => showToast('Title', 'Message', 'error', undefined)} state={'error'}>Show
                            Toast</Button>
                        <Button onClick={() => showToast('Title', 'Message', 'success', undefined)} state={'success'}>Show
                            Toast</Button>
                        <Button onClick={() => showToast('Title', 'Message', 'disabled', undefined)}>Show Toast</Button>
                        <Button onClick={() => showToast('Title', 'Message', 'default', 5000)}>Show Toast (auto
                            close)</Button>
                        <Button
                            onClick={() => showToast('Title', 'Message', 'default', undefined, () => alert('Toast clicked!'))}>Show
                            Toast (with callback)</Button>
                        <Button
                            onClick={() => showToast('Title', 'Message', 'warning', undefined, () => alert('Toast clicked!'))}
                            state={'warning'}>Show
                            Toast (with callback)</Button>
                        <Button
                            onClick={() => showToast('Title', 'Message', 'error', undefined, () => alert('Toast clicked!'))}
                            state={'error'}>Show
                            Toast (with callback)</Button>
                        <Button
                            onClick={() => showToast('Title', 'Message', 'success', undefined, () => alert('Toast clicked!'))}
                            state={'success'}>Show
                            Toast (with callback)</Button>
                        <Button
                            onClick={() => showToast('Title', 'Message', 'disabled', undefined, () => alert('Toast clicked!'))}>Show
                            Toast (with callback)</Button>

                    </div>
                    <div className={styles.documentationBox}>
                        <div>{`<Button onClick={() => showToast('Title', 'Message', 'default', 5000, () => alert('Toast clicked!'))} state={'default'}>Show Toast</Button>`}</div>
                    </div>
                    <div className={styles.parametersBox}>
                        <h5>Parameters:</h5>
                        <ul>
                            <li><code>title</code>: string</li>
                            <li><code>message</code>: string</li>
                            <li>
                                <code>status</code>: &#39;warning&#39; | &#39;error&#39; | &#39;disabled&#39; | &#39;success&#39; | &#39;default&#39;
                            </li>
                            <li><code>autoClose</code>: number (optional)</li>
                            <li><code>onClick</code>: function (optional)</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={styles['container-full']}>

                <div className={`${styles['section']} ${styles['full-width-section']}`}>
                    <h3>DataGrid</h3>
                </div>
            </div>
        </div>
    );
}

export default TheLab;