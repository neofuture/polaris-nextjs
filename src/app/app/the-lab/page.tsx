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
import FormInput from "@/components/microcomponents/form-input/form-input.component";
import {z} from 'zod';
import FormSelect from "@/components/microcomponents/form-select/form-select.component";
import ProductCard from "@/components/microcomponents/product-card/product-card.component";
import ProductCardContainer from "@/components/microcomponents/product-card-container/product-card-container.component";

const emailSchema = z.string().email({message: 'Invalid email address'});
const nameSchema = z.string().min(3, {message: 'Name must be longer than 2 characters'});
const selectSchema = z.enum(['option1', 'option2', 'option3']).refine(value => value !== 'option3', {
    message: 'Option 3 is not allowed',
});


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
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [emailError, setEmailError] = useState('');
    const [nameError, setNameError] = useState('');
    const [selectedValue, setSelectedValue] = useState('option2');
    const [selectError, setSelectError] = useState('');


    const handleToggle = () => {
        setToggleState(!toggleState);
    };

    const openModal = (modalName: string) => {
        setModalStates(prevState => ({...prevState, [modalName]: true}));
    };

    const closeModal = (modalName: string) => {
        setModalStates(prevState => ({...prevState, [modalName]: false}));
    };

    const clearCookiesAndLocalStorage = () => {
        const cookies = document.cookie.split("; ");
        for (const cookie of cookies) {
            const [name] = cookie.split("=");
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        }
        localStorage.clear();
        window.location.reload();
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        const result = emailSchema.safeParse(e.target.value);
        if (!result.success) {
            setEmailError(result.error.errors[0].message);
        } else {
            setEmailError('');
        }
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
        const result = nameSchema.safeParse(e.target.value);
        if (!result.success) {
            setNameError(result.error.errors[0].message);
        } else {
            setNameError('');
        }
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedValue(e.target.value);
        const result = selectSchema.safeParse(e.target.value);
        if (!result.success) {
            setSelectError(result.error.errors[0].message);
        } else {
            setSelectError('');
        }
    };

    return (
        <div className={styles['outer-container']}>
            <h1><i className={'fad fa-flask'}/> The Lab</h1>
            <h2>Welcome to The Lab</h2>

            <div className={styles['container']}>
                <div className={styles.section}>
                    <h3>NavLink</h3>
                    <div className={styles['component-container']}>
                        <NavLink onClick={() => alert('NavLink clicked')} iconName={'fad fa-flask'}>Go to example</NavLink>
                    </div>
                    <div className={styles.documentationBox}>
                        {`<NavLink onClick={handleClick} iconName={'fad fa-flask'}>Go to example</NavLink>`}
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
                <div className={styles.section}>
                    <h3>App Reset</h3>
                    <div className={styles['flex-buttons']}>
                        <Button state={'error'} iconName={'fad fa-arrow-rotate-left'} onClick={clearCookiesAndLocalStorage}>Reset
                            Cookie and Consent</Button>
                    </div>
                </div>
            </div>

            <div className={styles['container-half']}>

                <div className={styles.section}>
                    <h3>Modal</h3>
                    <div className={styles['flex-buttons']}>
                        <Button onClick={() => openModal('isFirstModalOpen')}
                                iconName='fas fa-up-right-from-square'>Open
                            First
                            Model</Button>
                        <Button onClick={() => openModal('isSecondModalOpen')}
                                iconName='fas fa-up-right-from-square'>Open
                            Second Modal (No close button)</Button>
                        <Button onClick={() => openModal('isThirdModalOpen')}
                                iconName='fas fa-up-right-from-square'>Open
                            Third
                            Modal (Blur close blocked)</Button>
                        <Button onClick={() => openModal('isFourthModalOpen')}
                                iconName='fas fa-up-right-from-square'>Open
                            Fourth
                            Modal (Auto close 5 seconds)</Button>
                        <Button onClick={() => openModal('isFifthModalOpen')}
                                iconName='fas fa-up-right-from-square'>Open
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
                        <Image src={theme === 'light' ? LogoDark : Logo} alt={'Hoops'} width={442}
                               height={234}/>
                    </Modal>
                    <Modal isOpen={modalStates.isFourthModalOpen}
                           onClose={() => closeModal('isFourthModalOpen')}
                           showCloseButton={false}
                           allowBlurClose={false}
                           closeTimer={5000}>
                        <Image src={theme === 'light' ? LogoDark : Logo} alt={'Hoops'} width={442}
                               height={234}/>
                    </Modal>
                    <Modal isOpen={modalStates.isFifthModalOpen}
                           onClose={() => closeModal('isFifthModalOpen')}
                           showCloseButton={true}
                           allowBlurClose={false}
                           closeTimer={20000}>
                        <Image src={theme === 'light' ? LogoDark : Logo} alt={'Hoops'} width={442}
                               height={234}/>
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
                        <Button iconName={'fas fa-bread-slice'}
                                onClick={() => showToast('Title', 'Message', 'default', undefined,)}
                                state={'default'}>Show
                            Toast</Button>
                        <Button iconName={'fas fa-bread-slice'}
                                onClick={() => showToast('Title', 'Message', 'secondary', undefined,)}
                                state={'secondary'}>Show
                            Toast</Button>
                        <Button iconName={'fas fa-bread-slice'}
                                onClick={() => showToast('Title', 'Message', 'success', undefined)}
                                state={'success'}>Show
                            Toast</Button>
                        <Button iconName={'fas fa-bread-slice'}
                                onClick={() => showToast('Title', 'Message', 'warning', undefined)}
                                state={'warning'}>Show
                            Toast</Button>
                        <Button iconName={'fas fa-bread-slice'}
                                onClick={() => showToast('Title', 'Message', 'error', undefined)}
                                state={'error'}>Show
                            Toast</Button>
                        <Button iconName={'fas fa-bread-slice'}
                                onClick={() => showToast('Title', 'Message', 'disabled', undefined)}
                                state={'disabled'}>Show
                            Toast</Button>
                        <hr/>
                        <Button iconName={'fas fa-bread-slice'}
                                onClick={() => showToast('Title', 'Message', 'disabled', undefined)}>Show
                            Toast</Button>
                        <Button iconName={'fas fa-bread-slice'}
                                onClick={() => showToast('Title', 'Message', 'default', 5000)}>Show Toast (auto
                            close)</Button>
                        <Button iconName={'fas fa-bread-slice'}
                                onClick={() => showToast('Title', 'Message', 'default', undefined, () => alert('Toast clicked!'))}>Show
                            Toast (with callback)</Button>
                        <Button iconName={'fas fa-bread-slice'}
                                state={'secondary'}
                                onClick={() => showToast('Title', 'Message', 'secondary', undefined, () => alert('Toast clicked!'))}>Show
                            Toast (with callback)</Button>
                        <Button iconName={'fas fa-bread-slice'}
                                onClick={() => showToast('Title', 'Message', 'success', undefined, () => alert('Toast clicked!'))}
                                state={'success'}>Show
                            Toast (with callback)</Button>
                        <Button iconName={'fas fa-bread-slice'}
                                onClick={() => showToast('Title', 'Message', 'warning', undefined, () => alert('Toast clicked!'))}
                                state={'warning'}>Show
                            Toast (with callback)</Button>
                        <Button iconName={'fas fa-bread-slice'}
                                onClick={() => showToast('Title', 'Message', 'error', undefined, () => alert('Toast clicked!'))}
                                state={'error'}>Show
                            Toast (with callback)</Button>
                        <Button iconName={'fas fa-bread-slice'}
                                onClick={() => showToast('Title', 'Message', 'disabled', undefined, () => alert('Toast clicked!'))}
                                state={'disabled'}>Show
                            Toast (with callback)</Button>

                    </div>
                    <div className={styles.documentationBox}>
                        <div>{`<Button iconName={'fas fa-toast'} onClick={() => showToast('Title', 'Message', 'default', 5000, () => alert('Toast clicked!'))} state={'default'}>Show Toast</Button>`}</div>
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
                <div className={styles.section}>
                    <h3>Button</h3>
                    <div className={styles['component-container']}>
                        <div className={styles['flex-buttons']}>

                            <Button onClick={() => alert('Default Button clicked!')}
                                    iconName={'fad fa-check'}>Default</Button>
                            <Button onClick={() => alert('Default Button clicked!')} iconName={'fad fa-user'}
                                    state={'secondary'}>Secondary</Button>
                            <Button onClick={() => alert('Success Button clicked!')} iconName={'fad fa-check-circle'}
                                    state={'success'}>Success</Button>
                            <Button onClick={() => alert('Warning Button clicked!')}
                                    iconName={'fad fa-exclamation-triangle'} state={'warning'}>Warning</Button>
                            <Button onClick={() => alert('Error Button clicked!')} iconName={'fad fa-times-circle'}
                                    state={'error'}>Error</Button>
                            <Button onClick={() => alert('Disabled Button clicked!')} iconName={'fad fa-ban'}
                                    state={'disabled'} disabled={true}>Disabled</Button>
                            <hr/>
                            <Button onClick={() => alert('Default Button clicked!')} iconName={'fad fa-check'}
                                    small={true}>Default</Button>
                            <Button onClick={() => alert('Default Button clicked!')} iconName={'fad fa-user'}
                                    state={'secondary'} small={true}>Secondary</Button>
                            <Button onClick={() => alert('Success Button clicked!')} iconName={'fad fa-check-circle'}
                                    state={'success'} small={true}>Success</Button>
                            <Button onClick={() => alert('Warning Button clicked!')}
                                    iconName={'fad fa-exclamation-triangle'} state={'warning'} small={true}>Warning</Button>
                            <Button onClick={() => alert('Error Button clicked!')} iconName={'fad fa-times-circle'}
                                    state={'error'} small={true}>Error</Button>
                            <Button onClick={() => alert('Disabled Button clicked!')} iconName={'fad fa-ban'}
                                    state={'disabled'} small={true} disabled={true}>Disabled</Button>
                            <hr/>
                            <Button onClick={() => alert('Rounded Button clicked!')} iconName={'fad fa-check'}
                                    rounded={true}></Button>
                            <Button onClick={() => alert('Rounded Button clicked!')} iconName={'fad fa-user'}
                                    state={'secondary'} rounded={true}></Button>
                            <Button onClick={() => alert('Rounded Button clicked!')} iconName={'fad fa-check-circle'}
                                    state={'success'} rounded={true}></Button>
                            <Button onClick={() => alert('Rounded Button clicked!')}
                                    iconName={'fad fa-exclamation-triangle'} state={'warning'} rounded={true}></Button>
                            <Button onClick={() => alert('Rounded Button clicked!')} iconName={'fad fa-times-circle'}
                                    state={'error'} rounded={true}></Button>
                            <Button onClick={() => alert('Rounded Button clicked!')} iconName={'fad fa-ban'}
                                    state={'disabled'} rounded={true} disabled={true}></Button>
                            <hr/>
                            <Button onClick={() => alert('Rounded Button clicked!')} iconName={'fad fa-check'}
                                    rounded={true} small={true}></Button>
                            <Button onClick={() => alert('Rounded Button clicked!')} iconName={'fad fa-user'}
                                    state={'secondary'} rounded={true} small={true}></Button>
                            <Button onClick={() => alert('Rounded Button clicked!')} iconName={'fad fa-check-circle'}
                                    state={'success'} small={true} rounded={true}></Button>
                            <Button onClick={() => alert('Rounded Button clicked!')}
                                    iconName={'fad fa-exclamation-triangle'} state={'warning'} small={true}
                                    rounded={true}></Button>
                            <Button onClick={() => alert('Rounded Button clicked!')} iconName={'fad fa-times-circle'}
                                    state={'error'} small={true} rounded={true}></Button>
                            <Button onClick={() => alert('Rounded Button clicked!')} iconName={'fad fa-ban'}
                                    state={'disabled'} small={true} rounded={true} disabled={true}></Button>

                            <hr/>
                            <Button onClick={() => alert('Default Button clicked!')}>Default</Button>
                            <Button onClick={() => alert('Default Button clicked!')}
                                    state={'secondary'}>Default</Button>
                            <Button onClick={() => alert('Success Button clicked!')} state={'success'}>Success</Button>
                            <Button onClick={() => alert('Warning Button clicked!')} state={'warning'}>Warning</Button>
                            <Button onClick={() => alert('Error Button clicked!')} state={'error'}>Error</Button>
                            <Button onClick={() => alert('Disabled Button clicked!')} state={'disabled'}
                                    disabled={true}>Disabled</Button>
                            <hr/>
                            <Button onClick={() => alert('Default Button clicked!')} small={true}>Default</Button>
                            <Button onClick={() => alert('Default Button clicked!')} state={'secondary'}
                                    small={true}>Secondary</Button>
                            <Button onClick={() => alert('Success Button clicked!')} state={'success'}
                                    small={true}>Success</Button>
                            <Button onClick={() => alert('Warning Button clicked!')} small={true}>Warning</Button>
                            <Button onClick={() => alert('Error Button clicked!')} state={'error'}
                                    small={true}>Error</Button>
                            <Button onClick={() => alert('Disabled Button clicked!')} small={true}
                                    disabled={true}>Disabled</Button>

                        </div>
                    </div>
                    <div className={styles.documentationBox}>
                        {`<Button onClick={handleClick} iconName={'fad fa-flask'} state={'warning'}>Click me</Button>`}
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
                            <li>
                                <code>disabled</code>: boolean (optional)
                            </li>
                            <li>
                                <code>small</code>: boolean (optional)
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={styles.section}>
                    <h3>Form Input</h3>
                    <div>
                        <FormInput
                            id='name'
                            type="text"
                            label="Name"
                            value={name}
                            onChange={handleNameChange}
                            error={nameError}
                        />

                        <FormInput
                            id='email'
                            type="email"
                            label="Email"
                            value={email}
                            onChange={handleEmailChange}
                            error={emailError}
                        />

                        <hr/>
                        <div><b>Name:</b> {name}</div>
                        <div><b>Email:</b> {email}</div>
                        <div className={styles.documentationBox}>
                            <div>{`<FormInput type="text" label="Name" value={name} onChange={handleNameChange} error={nameError} />`}</div>
                        </div>
                        <div className={styles.parametersBox}>
                            <h5>Parameters:</h5>
                            <ul>
                                <li>
                                    <code>type</code>: &#39;text&#39; | &#39;password&#39; | &#39;email&#39; | &#39;url&#39; | &#39;tel&#39; | &#39;number&#39; | &#39;range&#39; |
                                    &#39;date&#39; | &#39;month&#39; | &#39;week&#39; | &#39;time&#39; | &#39;datetime-local&#39; | &#39;color&#39; |
                                    &#39;radio&#39; | &#39;file&#39; | &#39;image&#39;
                                </li>
                                <li><code>label</code>: string</li>
                                <li><code>value</code>: string</li>
                                <li><code>onChange</code>: function</li>
                                <li><code>error</code>: string (optional)</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={styles.section}>
                    <h3>Form Select</h3>
                    <FormSelect
                        id='select'
                        label="Select Option"
                        value={selectedValue}
                        onChange={handleSelectChange}
                        options={[
                            {value: 'option1', label: 'Option 1'},
                            {value: 'option2', label: 'Option 2'},
                            {value: 'option3', label: 'Option 3 (is an error)'},
                        ]}
                        error={selectError}
                    />
                    <div className={styles.documentationBox}>
                        <div>{`<FormSelect label="Select Option" value={selectedValue} onChange={handleSelectChange} options={[{ value: 'option1', label: 'Option 1' }, { value: 'option2', label: 'Option 2' }, { value: 'option3', label: 'Option 3 (is an error)' }]} error={selectError} />`}</div>
                    </div>
                    <div className={styles.parametersBox}>
                        <h5>Parameters:</h5>
                        <ul>
                            <li><code>label</code>: string</li>
                            <li><code>value</code>: string</li>
                            <li><code>onChange</code>: function</li>
                            <li><code>options</code>: {`{ value: string; label: string }[]`}</li>
                            <li><code>error</code>: string (optional)</li>
                        </ul>
                    </div>
                </div>
                <div className={styles.section}>
                    <h3>Product Card</h3>
                    <ProductCardContainer>
                        <ProductCard title={'Product Title'}/>
                        <ProductCard title={'Product Title'}/>
                        <ProductCard title={'Product Title'}/>
                    </ProductCardContainer>

                    <div className={styles.documentationBox}>
                        <div>{`<ProductCardContainer>`}</div>
                        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`<ProductCard title={'Product Title'} />`}</div>
                        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`<ProductCard title={'Product Title'} />`}</div>
                        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`<ProductCard title={'Product Title'} />`}</div>
                        <div>{`</ProductCardContainer>`}</div>
                    </div>
                    <div className={styles.parametersBox}>
                        <h5>Parameters:</h5>
                        <ul>
                            <li><code>title</code>: string</li>
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