"use client";

import React, {useState} from 'react';
import Image from "next/image";
import Link from "next/link";
import {useTheme} from "@/context/ThemeContext";
import {showToast} from "@/components/microcomponents/toast/toast-utils";
import NavLink from '@/components/microcomponents/nav-link/nav-link.component';
import Button from '@/components/microcomponents/button/button.component';
import ColorPicker from "@/components/microcomponents/color-picker/color-picker.component";
import ToggleSwitch from "@/components/microcomponents/toggle-switch/toggle-switch.component";
import Modal from "@/components/microcomponents/modal/modal.component";
import FormInput from "@/components/microcomponents/form-input/form-input.component";
import FormSelect from "@/components/microcomponents/form-select/form-select.component";
import ProductCard from "@/components/microcomponents/product-card/product-card.component";
import ProductCardContainer from "@/components/microcomponents/product-card-container/product-card-container.component";
import FormPassword from "@/components/microcomponents/form-password/form-password.component";
import Text from "@/components/microcomponents/text/text.component";
import styles from './lab.module.css';
import {z} from 'zod';
import Logo from "../../../../public/images/logo.png";
import LogoDark from "../../../../public/images/logo_dark.png";
import FormRadioGroup from "@/components/microcomponents/form-radio-group/form-radio-group.component";
import FormRadioInput from "@/components/microcomponents/form-radio-input/form-radio-input.component";
import FormCheckbox from "@/components/microcomponents/form-checkbox/form-checkbox.component";
const emailSchema = z.string().email({message: 'Invalid email address'});
const nameSchema = z.string().min(3, {message: 'Name must be longer than 2 characters'});
const selectSchema = z.enum(['option1', 'option2', 'option3']).refine(value => value !== 'option3', {
    message: 'Option 3 is not allowed',
});
const passwordSchema = z.string().min(8, {message: 'Password must be at least 8 characters long'});
const radioSchema = z.enum(['option 1', 'option 2', 'option 3']).refine(value => value !== 'option 3', {
    message: 'Option 3 is not allowed',
});
const checkboxSchema = z.boolean().refine(value => value === true, {
    message: 'This checkbox must be checked',
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
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [nameError, setNameError] = useState('');
    const [selectedValue, setSelectedValue] = useState('option2');
    const [selectError, setSelectError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [selectedRadio, setSelectedRadio] = useState('');
    const [radioError, setRadioError] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [checkboxError, setCheckboxError] = useState('');

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

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        const result = passwordSchema.safeParse(e.target.value);
        if (!result.success) {
            setPasswordError(result.error.errors[0].message);
        } else {
            setPasswordError('');
        }
    }

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedRadio(e.target.value);
        const result = radioSchema.safeParse(e.target.value);
        if (!result.success) {
            setRadioError(result.error.errors[0].message);
        } else {
            setRadioError('');
        }
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        setIsChecked(checked);
        const result = checkboxSchema.safeParse(checked);
        if (!result.success) {
            setCheckboxError(result.error.errors[0].message);
        } else {
            setCheckboxError('');
        }
    };

    const card1data = {
        title: {
            text: 'Individual',
            className: 'primary'
        },
        sections: [
            {
                title: 'Personal',
                content: ['15 Active product listings', 'Unlimited inventory products', 'Unlimited Selling Channels', 'Multi Channel Listing', 'Cross Channel Syncronisation', 'Autodelisting'],
                current: true,
                currentText: 'Your membership',
                buttonText: 'View Details',
                buttonState: 'primary',
                callBack: () => openModal('isFirstModalOpen'),
                cost: 'Free'
            },
            {
                title: 'Casual',
                content: ['25 Active product listings', 'Unlimited inventory products', 'Unlimited Selling Channels', 'Multi Channel Listing', 'Cross Channel Syncronisation', 'Autodelisting'],
                current: false,
                buttonText: 'Upgrade',
                buttonState: 'secondary',
                callBack: () => openModal('isFirstModalOpen'),
                cost: '£7 / month'
            },
            {
                title: 'Starter',
                content: ['50 Active product listings', 'Unlimited inventory products', 'Unlimited Selling Channels', 'Multi Channel Listing', 'Cross Channel Syncronisation', 'Autodelisting'],
                current: false,
                buttonText: 'Upgrade',
                buttonState: 'secondary',
                callBack: () => openModal('isFirstModalOpen'),
                cost: '£15 / month'
            }
        ]

    };

    const card2data = {
        title: {
            text: 'Trader',
            className: 'secondary'
        },
        sections: [
            {
                title: 'Bronze',
                content: ['200 Active product listings', 'Unlimited inventory products', 'Unlimited Selling Channels', 'Multi Channel Listing', 'Cross Channel Syncronisation', 'Autodelisting'],
                current: false,
                buttonText: 'Upgrade',
                buttonState: 'secondary',
                callBack: () => openModal('isFirstModalOpen'),
                cost: '£35 / month'
            },
            {
                title: 'Silver',
                content: ['500 Active product listings', 'Unlimited inventory products', 'Unlimited Selling Channels', 'Multi Channel Listing', 'Cross Channel Syncronisation', 'Autodelisting'],
                current: false,
                buttonText: 'Upgrade',
                buttonState: 'secondary',
                callBack: () => openModal('isFirstModalOpen'),
                cost: '£75 / month'
            },
            {
                title: 'Gold',
                content: ['1000 Active product listings', 'Unlimited inventory products', 'Unlimited Selling Channels', 'Multi Channel Listing', 'Cross Channel Syncronisation', 'Autodelisting'],
                current: false,
                buttonText: 'Upgrade',
                buttonState: 'secondary',
                callBack: () => openModal('isFirstModalOpen'),
                cost: '£90 / month'
            }
        ]
    };

    const card3data = {
        title: {
            text: 'Business',
            className: 'secondary'
        },
        sections: [
            {
                title: 'Bronze',
                content: ['2000 Active product listings', 'Unlimited inventory products', 'Unlimited Selling Channels', 'Multi Channel Listing', 'Cross Channel Syncronisation', 'Autodelisting'],
                current: false,
                buttonText: 'Upgrade',
                buttonState: 'secondary',
                callBack: () => openModal('isFirstModalOpen'),
                cost: '£125 / month'
            },
            {
                title: 'Silver',
                content: ['5000 Active product listings', 'Unlimited inventory products', 'Unlimited Selling Channels', 'Multi Channel Listing', 'Cross Channel Syncronisation', 'Autodelisting'],
                current: false,
                buttonText: 'Upgrade',
                buttonState: 'secondary',
                callBack: () => openModal('isFirstModalOpen'),
                cost: '£175 / month'
            },
            {
                title: 'Gold',
                content: ['10000 Active product listings', 'Unlimited inventory products', 'Unlimited Selling Channels', 'Multi Channel Listing', 'Cross Channel Syncronisation', 'Autodelisting'],
                current: false,
                buttonText: 'Upgrade',
                buttonState: 'secondary',
                callBack: () => openModal('isFirstModalOpen'),
                cost: '£250 / month'
            }
        ]
    };

    return (
        <div className={styles['outer-container']}>
            <h1><i className={'fad fa-flask'}/> The Lab</h1>
            <h2>Welcome to The Lab</h2>

            <div className={styles['container']}>
                <div className={styles.section}>
                    <h3>NavLink</h3>
                    <div className={styles['component-container']}>
                        <NavLink onClick={() => alert('NavLink clicked')} iconName={'fad fa-flask'}>Go to
                            example</NavLink>
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
                        <div>{`<Button onClick={() => openModal('isFirstModalOpen')} iconName='fas fa-up-right-from-square'>Open Model</Button>`}</div>
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
                                onClick={() => showToast('Title', 'Message', 'info')}
                                state={'info'}>Show Toast</Button>
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
                    <h3>Form Password</h3>
                    <FormPassword
                        id='password'
                        label="Password"
                        value={password}
                        onChange={handlePasswordChange}
                        error={passwordError}
                    />
                    <div className={styles.documentationBox}>
                        <div>{`<FormPassword label="Password" value={password} onChange={handlePasswordChange} />`}</div>
                    </div>
                    <div className={styles.parametersBox}>
                        <h5>Parameters:</h5>
                        <ul>
                            <li><code>label</code>: string</li>
                            <li><code>value</code>: string</li>
                            <li><code>onChange</code>: function</li>
                            <li><code>error</code>: string (optional)</li>
                            <li><code>showPassword</code>: boolean (optional)</li>
                        </ul>
                    </div>
                </div>
                <div className={styles.section}>
                    <h3>Form Select</h3>
                    <FormSelect
                        id='select'
                        label="Select Option"
                        value={selectedValue}
                        onChange={handleSelectChange}
                        error={selectError}
                    >
                        <option value='option1'>Option 1</option>
                        <option value='option2'>Option 2</option>
                        <option value='option3'>Option 3 (is an error)</option>
                    </FormSelect>
                    <div className={styles.documentationBox}>
                        <div>{`<FormSelect label="Select Option" value={selectedValue} onChange={handleSelectChange} error={selectError}>`}</div>
                        <div>&nbsp;&nbsp;{`<option value='option1'>Option 1</option>`}</div>
                        <div>&nbsp;&nbsp;{`<option value='option2'>Option 2</option>`}</div>
                        <div>&nbsp;&nbsp;{`<option value='option3'>Option 3 (is an error)</option>`}</div>
                        <div>{`</FormSelect>`}</div>
                    </div>
                    <div className={styles.parametersBox}>
                        <h5>Parameters:</h5>
                        <ul>
                            <li><code>label</code>: string</li>
                            <li><code>value</code>: string</li>
                            <li><code>onChange</code>: function</li>
                            <li><code>error</code>: string (optional)</li>
                            <li><code>children</code>: React.ReactNode</li>
                        </ul>
                    </div>
                </div>
                <div className={styles.section}>
                    <h3>Form Radio/Group</h3>
                    <div className={styles['flex-buttons']}>
                        <FormRadioGroup label={'Form Group'} error={radioError}>
                            <FormRadioInput
                                name={'radioGroup'}
                                value={'option 1'}
                                label='Option 1'
                                checked={selectedRadio === 'option 1'}
                                onChange={handleRadioChange}
                                error={radioError}
                            />
                            <FormRadioInput
                                name={'radioGroup'}
                                value={'option 2'}
                                label='Option 2'
                                checked={selectedRadio === 'option 2'}
                                onChange={handleRadioChange}
                                error={radioError}
                            />
                            <FormRadioInput
                                name={'radioGroup'}
                                value={'option 3'}
                                label='Option 3'
                                checked={selectedRadio === 'option 3'}
                                onChange={handleRadioChange}
                                error={radioError}
                                rounded={true}
                            />
                        </FormRadioGroup>
                    </div>
                    <div className={styles.documentationBox}>
                        <div>{`<FormRadioGroup label={'Form Group'} error={radioError}>`}</div>
                        <div>&nbsp;&nbsp;{`<FormRadioInput name={'radioGroup'} value={'option 1'} label='Option 1' checked={selectedRadio === 'option 1'} onChange={handleRadioChange} error={radioError} />`}</div>
                        <div>&nbsp;&nbsp;{`<FormRadioInput name={'radioGroup'} value={'option 2'} label='Option 2' checked={selectedRadio === 'option 2'} onChange={handleRadioChange} error={radioError} />`}</div>
                        <div>&nbsp;&nbsp;{`<FormRadioInput name={'radioGroup'} value={'option 3'} label='Option 3' checked={selectedRadio === 'option 3'} onChange={handleRadioChange} error={radioError} />`}</div>
                        <div>{`</FormRadioGroup>`}</div>
                    </div>
                    <div className={styles.parametersBox}>
                        <h5>Parameters FormRadioGroup:</h5>
                        <ul>
                            <li><code>label</code>: string</li>
                            <li><code>error</code>: string (optional)</li>
                            <li><code>children</code>: React.ReactNode</li>
                        </ul>
                        <h5>Parameters FormRadioInput:</h5>
                        <ul>
                            <li><code>name</code>: string</li>
                            <li><code>value</code>: string</li>
                            <li><code>label</code>: string</li>
                            <li><code>checked</code>: boolean</li>
                            <li><code>onChange</code>: function</li>
                            <li><code>error</code>: string (optional)</li>
                            <li><code>rounded</code>: boolean (optional)</li>
                        </ul>
                    </div>
                </div>
                <div className={styles.section}>
                    <h3>Form Checkbox</h3>
                    <div>
                        <FormCheckbox
                            label={'Form Checkbox'}
                            error={checkboxError}
                            name={'checkbox'}
                            value={'checkbox'}
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                        />
                        <FormCheckbox
                            label={'Form Checkbox 2'}
                            name={'checkbox2'}
                            value={'checkbox2'}
                        />
                        <FormCheckbox
                            label={'Form Checkbox Rounded'}
                            name={'checkbox3'}
                            value={'checkbox3'}
                            rounded={true}
                        />
                    </div>
                    <div className={styles.documentationBox}>
                        <div>{`<FormCheckbox label={'Form Checkbox'} error={checkboxError} name={'checkbox'} value={'checkbox'} checked={isChecked} onChange={handleCheckboxChange} />`}</div>
                        <div>{`<FormCheckbox label={'Form Checkbox 2'} name={'checkbox2'} value={'checkbox2'} />`}</div>
                        <div>{`<FormCheckbox label={'Form Checkbox Rounded'} name={'checkbox3'} value={'checkbox3'} rounded={true} />`}</div>
                    </div>
                    <div className={styles.parametersBox}>
                        <h5>Parameters:</h5>
                        <ul>
                            <li><code>label</code>: string</li>
                            <li><code>error</code>: string (optional)</li>
                            <li><code>name</code>: string</li>
                            <li><code>value</code>: string</li>
                            <li><code>checked</code>: boolean</li>
                            <li><code>onChange</code>: function</li>
                            <li><code>rounded</code>: boolean (optional)</li>
                        </ul>
                    </div>
                </div>
                <div className={styles.section}>
                    <h3>Button</h3>
                    <div className={styles['component-container']}>
                        <div className={styles['flex-buttons']}>

                            <Button onClick={() => alert('Default Button clicked!')}
                                    iconName={'fas fa-check'}>Default</Button>
                            <Button onClick={() => alert('Default Button clicked!')} iconName={'fas fa-user'}
                                    state={'secondary'}>Secondary</Button>
                            <Button onClick={() => alert('Success Button clicked!')} iconName={'fas fa-check-circle'}
                                    state={'success'}>Success</Button>
                            <Button onClick={() => alert('Warning Button clicked!')}
                                    iconName={'fas fa-exclamation-triangle'} state={'warning'}>Warning</Button>
                            <Button onClick={() => alert('Error Button clicked!')} iconName={'fas fa-times-circle'}
                                    state={'error'}>Error</Button>
                            <Button onClick={() => alert('Disabled Button clicked!')} iconName={'fas fa-ban'}
                                    state={'disabled'} disabled={true}>Disabled</Button>
                            <hr/>
                            <Button onClick={() => alert('Default Button clicked!')} iconName={'fas fa-check'}
                                    size={'small'}>Default</Button>
                            <Button onClick={() => alert('Default Button clicked!')} iconName={'fas fa-user'}
                                    state={'secondary'} size={'small'}>Secondary</Button>
                            <Button onClick={() => alert('Success Button clicked!')} iconName={'fas fa-check-circle'}
                                    state={'success'} size={'small'}>Success</Button>
                            <Button onClick={() => alert('Warning Button clicked!')}
                                    iconName={'fas fa-exclamation-triangle'} state={'warning'}
                                    size={'small'}>Warning</Button>
                            <Button onClick={() => alert('Error Button clicked!')} iconName={'fas fa-times-circle'}
                                    state={'error'} size={'small'}>Error</Button>
                            <Button onClick={() => alert('Disabled Button clicked!')} iconName={'fas fa-ban'}
                                    state={'disabled'} size={'small'} disabled={true}>Disabled</Button>
                            <hr/>
                            <Button onClick={() => alert('Default Button clicked!')} iconName={'fas fa-check'}
                                    size={'tiny'}>Default</Button>
                            <Button onClick={() => alert('Default Button clicked!')} iconName={'fas fa-user'}
                                    state={'secondary'} size={'tiny'}>Secondary</Button>
                            <Button onClick={() => alert('Success Button clicked!')} iconName={'fas fa-check-circle'}
                                    state={'success'} size={'tiny'}>Success</Button>
                            <Button onClick={() => alert('Warning Button clicked!')}
                                    iconName={'fas fa-exclamation-triangle'} state={'warning'}
                                    size={'tiny'}>Warning</Button>
                            <Button onClick={() => alert('Error Button clicked!')} iconName={'fas fa-times-circle'}
                                    state={'error'} size={'tiny'}>Error</Button>
                            <Button onClick={() => alert('Disabled Button clicked!')} iconName={'fas fa-ban'}
                                    state={'disabled'} size={'tiny'} disabled={true}>Disabled</Button>
                            <hr/>
                            <Button onClick={() => alert('Rounded Button clicked!')} iconName={'fas fa-check'}
                                    rounded={true}></Button>
                            <Button onClick={() => alert('Rounded Button clicked!')} iconName={'fas fa-user'}
                                    state={'secondary'} rounded={true}></Button>
                            <Button onClick={() => alert('Rounded Button clicked!')} iconName={'fas fa-check-circle'}
                                    state={'success'} rounded={true}></Button>
                            <Button onClick={() => alert('Rounded Button clicked!')}
                                    iconName={'fas fa-exclamation-triangle'} state={'warning'} rounded={true}></Button>
                            <Button onClick={() => alert('Rounded Button clicked!')} iconName={'fas fa-times-circle'}
                                    state={'error'} rounded={true}></Button>
                            <Button onClick={() => alert('Rounded Button clicked!')} iconName={'fas fa-ban'}
                                    state={'disabled'} rounded={true} disabled={true}></Button>
                            <hr/>
                            <Button onClick={() => alert('Rounded Button clicked!')} iconName={'fas fa-check'}
                                    rounded={true} size={'small'}></Button>
                            <Button onClick={() => alert('Rounded Button clicked!')} iconName={'fas fa-user'}
                                    state={'secondary'} rounded={true} size={'small'}></Button>
                            <Button onClick={() => alert('Rounded Button clicked!')} iconName={'fas fa-check-circle'}
                                    state={'success'} size={'small'} rounded={true}></Button>
                            <Button onClick={() => alert('Rounded Button clicked!')}
                                    iconName={'fas fa-exclamation-triangle'} state={'warning'} size={'small'}
                                    rounded={true}></Button>
                            <Button onClick={() => alert('Rounded Button clicked!')} iconName={'fas fa-times-circle'}
                                    state={'error'} size={'small'} rounded={true}></Button>
                            <Button onClick={() => alert('Rounded Button clicked!')} iconName={'fas fa-ban'}
                                    state={'disabled'} size={'small'} rounded={true} disabled={true}></Button>
                            <hr/>
                            <Button onClick={() => alert('Rounded Button clicked!')} iconName={'fas fa-check'}
                                    rounded={true} size={'tiny'}></Button>
                            <Button onClick={() => alert('Rounded Button clicked!')} iconName={'fas fa-user'}
                                    state={'secondary'} rounded={true} size={'tiny'}></Button>
                            <Button onClick={() => alert('Rounded Button clicked!')} iconName={'fas fa-check-circle'}
                                    state={'success'} size={'tiny'} rounded={true}></Button>
                            <Button onClick={() => alert('Rounded Button clicked!')}
                                    iconName={'fas fa-exclamation-triangle'} state={'warning'} size={'tiny'}
                                    rounded={true}></Button>
                            <Button onClick={() => alert('Rounded Button clicked!')} iconName={'fas fa-times-circle'}
                                    state={'error'} size={'tiny'} rounded={true}></Button>
                            <Button onClick={() => alert('Rounded Button clicked!')} iconName={'fas fa-ban'}
                                    state={'disabled'} size={'tiny'} rounded={true} disabled={true}></Button>
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
                            <Button onClick={() => alert('Default Button clicked!')} size={'small'}>Default</Button>
                            <Button onClick={() => alert('Default Button clicked!')} state={'secondary'}
                                    size={'small'}>Secondary</Button>
                            <Button onClick={() => alert('Success Button clicked!')} state={'success'}
                                    size={'small'}>Success</Button>
                            <Button onClick={() => alert('Warning Button clicked!')} size={'small'}
                                    state={'warning'}>Warning</Button>
                            <Button onClick={() => alert('Error Button clicked!')} state={'error'}
                                    size={'small'}>Error</Button>
                            <Button onClick={() => alert('Disabled Button clicked!')} size={'small'}
                                    state={'disabled'}
                                    disabled={true}>Disabled</Button>
                            <hr/>
                            <Button onClick={() => alert('Default Button clicked!')} size={'tiny'}>Default</Button>
                            <Button onClick={() => alert('Default Button clicked!')} state={'secondary'}
                                    size={'tiny'}>Secondary</Button>
                            <Button onClick={() => alert('Success Button clicked!')} state={'success'}
                                    size={'tiny'}>Success</Button>
                            <Button onClick={() => alert('Warning Button clicked!')} size={'tiny'}
                                    state={'warning'}>Warning</Button>
                            <Button onClick={() => alert('Error Button clicked!')} state={'error'}
                                    size={'tiny'}>Error</Button>
                            <Button onClick={() => alert('Disabled Button clicked!')} size={'tiny'}
                                    state={'disabled'}
                                    disabled={true}>Disabled</Button>
                            <hr/>
                            <Button onClick={() => alert('Fixed Width Button clicked!')} width={500}>Fixed Width
                                (500px)</Button>
                            <Button onClick={() => alert('Fixed Width Button clicked!')} width={'100%'}>Fixed Width
                                (100%)</Button>

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
                                <code>state</code>: &#39;default&#39; | &#39;info&#39; | &#39;warning&#39; | &#39;error&#39; | &#39;disabled&#39; | &#39;success&#39; (optional)
                            </li>
                            <li>
                                <code>disabled</code>: boolean (optional)
                            </li>
                            <li>
                                <code>size</code>: &#39;small&#39; | &#39;tiny&#39; (optional)
                            </li>
                            <li>
                                <code>width</code>: number | string (optional)
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className={styles['container-full']}>
                <div className={styles.section}>
                    <h3>Product Card</h3>
                    <ProductCardContainer>
                        <ProductCard payload={card1data}/>
                        <ProductCard payload={card2data}/>
                        <ProductCard payload={card3data}/>
                    </ProductCardContainer>
                    <pre>
                        <h2>Card 1</h2>
                        <code>{JSON.stringify(card1data, null, 2)}</code>
                        <hr/>
                        <h2>Card 2</h2>
                        <code>{JSON.stringify(card2data, null, 2)}</code>
                        <h2>Card 3</h2>
                        <hr/>
                        <code>{JSON.stringify(card3data, null, 2)}</code>
                    </pre>
                    <div className={styles.documentationBox}>
                        <div>{`<ProductCardContainer>`}</div>
                        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`<ProductCard payload={card1data} />`}</div>
                        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`<ProductCard payload={card2data} />`}</div>
                        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`<ProductCard payload={card3data} />`}</div>
                        <div>{`</ProductCardContainer>`}</div>
                    </div>
                    <div className={styles.parametersBox}>
                        <h5>Parameters:</h5>
                        <ul>
                            <li><code>payload</code>: object</li>
                        </ul>
                    </div>
                </div>
                <div className={styles.section}>
                    <h3>Text</h3>
                    <Text as="h1" state="default" size="T900" weight="bold">Default H1 Bold</Text>
                    <Text as="h2" state="success" size="T800" weight="heavy">Success H2 Heavy</Text>
                    <Text as="h3" state="error" size="T700" weight="medium">Error H3 Medium</Text>
                    <Text as="span" state="warning" size="T600" weight="regular">Warning Span Regular</Text>
                    <Text as="div" state="info" size="T500" weight="light">Info Div Light</Text>
                    <Text as="h1" state="light" size="T400" weight="bold">Light H1 Bold</Text>
                    <Text as="h2" state="dark" size="T300" weight="heavy">Dark H2 Heavy</Text>
                    <Text as="h3" state="inherit" size="T200" weight="medium">Inherit H3 Medium</Text>
                    <Text as="h1" state="default" size="T900" weight="bold">Default H1 Bold</Text>
                    <Text as="h2" state="success" size="T800" weight="heavy">Success H2 Heavy</Text>
                    <Text as="h3" state="error" size="T700" weight="medium">Error H3 Medium</Text>
                    <Text as="span" state="warning" size="T600" weight="regular">Warning Span Regular</Text>
                    <Text as="div" state="info" size="T500" weight="light">Info Div Light</Text>
                    <Text as="h1" state="light" size="T400" weight="bold">Light H1 Bold</Text>
                    <Text as="h2" state="dark" size="T300" weight="heavy">Dark H2 Heavy</Text>
                    <Text as="h3" state="inherit" size="T200" weight="medium">Inherit H3 Medium</Text>
                    <Text as="p" state="default" size="T500" weight="regular">Default P Regular</Text>
                    <Text as="h4" state="success" size="T600" weight="bold">Success H4 Bold</Text>
                    <Text as="h5" state="error" size="T700" weight="heavy">Error H5 Heavy</Text>
                    <Text as="h6" state="warning" size="T800" weight="medium">Warning H6 Medium</Text>
                    <Text as="span" state="info" size="T900" weight="light">Info Span Light</Text>
                    <Text as="div" state="light" size="T200" weight="regular">Light Div Regular</Text>
                    <Text as="h1" state="dark" size="T300" weight="bold">Dark H1 Bold</Text>
                    <Text as="h2" state="inherit" size="T400" weight="heavy">Inherit H2 Heavy</Text>
                    <Text as="h3" state="default" size="T500" weight="medium">Default H3 Medium</Text>
                    <Text as="p" state="success" size="T600" weight="light">Success P Light</Text>
                    <Text as="h4" state="error" size="T700" weight="regular">Error H4 Regular</Text>
                    <Text as="h5" state="warning" size="T800" weight="bold">Warning H5 Bold</Text>
                    <Text as="h6" state="info" size="T900" weight="heavy">Info H6 Heavy</Text>
                    <Text as="span" state="light" size="T200" weight="medium">Light Span Medium</Text>
                    <Text as="div" state="dark" size="T300" weight="light">Dark Div Light</Text>
                    <Text as="h1" state="inherit" size="T400" weight="regular">Inherit H1 Regular</Text>
                    <Text as="h2" state="default" size="T500" weight="bold">Default H2 Bold</Text>
                    <Text as="h3" state="success" size="T600" weight="heavy">Success H3 Heavy</Text>
                    <Text as="p" state="error" size="T700" weight="medium">Error P Medium</Text>
                    <Text as="h4" state="warning" size="T800" weight="light">Warning H4 Light</Text>
                    <Text as="h5" state="info" size="T900" weight="regular">Info H5 Regular</Text>
                    <Text as="h6" state="light" size="T200" weight="bold">Light H6 Bold</Text>
                    <Text as="span" state="dark" size="T300" weight="heavy">Dark Span Heavy</Text>
                    <Text as="div" state="inherit" size="T400" weight="medium">Inherit Div Medium</Text>
                    <Text as="h1" state="default" size="T500" weight="light">Default H1 Light</Text>
                    <Text as="h2" state="success" size="T600" weight="regular">Success H2 Regular</Text>
                    <Text as="h3" state="error" size="T700" weight="bold">Error H3 Bold</Text>
                    <Text as="p" state="warning" size="T800" weight="heavy">Warning P Heavy</Text>
                    <Text as="h4" state="info" size="T900" weight="medium">Info H4 Medium</Text>
                    <Text as="h5" state="light" size="T200" weight="light">Light H5 Light</Text>
                    <Text as="h6" state="dark" size="T300" weight="regular">Dark H6 Regular</Text>
                    <Text as="span" state="inherit" size="T400" weight="bold">Inherit Span Bold</Text>
                    <Text as="div" state="default" size="T500" weight="heavy">Default Div Heavy</Text>

                    <div className={styles.documentationBox}>
                        <div>{`<Text as="h1" state="default" size="T900" weight="bold">Default H1 Bold</Text>`}</div>
                    </div>
                    <div className={styles.parametersBox}>
                        <h5>Parameters:</h5>
                        <ul>
                            <li>
                                <code>as</code>: &#39;h1&#39; | &#39;h2&#39; | &#39;h3&#39; | &#39;h4&#39; | &#39;h5&#39; | &#39;h6v
                                | &#39;p&#39; | &#39;span&#39; | &#39;div&#39; | &#39;a&#39; | &#39;button&#39; | &#39;label&#39; | &#39;li&#39; | &#39;ul&#39; | &#39;ol&#39; | &#39;nav&#39; | &#39;section&#39; | &#39;article&#39; | &#39;header&#39; | &#39;footer&#39; | &#39;main&#39;;
                            </li>
                            <li>
                                <code>state</code>: &#39;default&#39; | &#39;info&#39; | &#39;warning&#39; | &#39;error&#39; | &#39;success&#39; | &#39;light&#39; | &#39;dark&#39; | &#39;inherit&#39;
                            </li>
                            <li><code>size</code>: string</li>
                            <li><code>weight</code>: string</li>
                        </ul>
                    </div>
                </div>
            </div>


            <div className={styles['container-full']}>

                <div className={`${styles['section']} ${styles['full-width-section']}`}>
                    <h3>DataGrid</h3>
                </div>
                <div className={styles.section}>
                    <h3>App Reset</h3>
                    <div className={styles['flex-buttons']}>
                        <Button state={'error'} iconName={'fas fa-arrow-rotate-left'}
                                onClick={clearCookiesAndLocalStorage}>Reset
                            Cookie and Consent</Button>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default TheLab;