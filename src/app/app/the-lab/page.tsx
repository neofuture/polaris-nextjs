"use client";

import React, {useEffect, useState} from 'react';
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
import styles from './lab.module.css';
import {z} from 'zod';
import Logo from "../../../../public/images/logo.png";
import LogoDark from "../../../../public/images/logo_dark.png";
import FormRadioGroup from "@/components/microcomponents/form-radio-group/form-radio-group.component";
import FormRadioInput from "@/components/microcomponents/form-radio-input/form-radio-input.component";
import FormCheckbox from "@/components/microcomponents/form-checkbox/form-checkbox.component";
import DatePicker from "@/components/microcomponents/date-picker/date-picker.component";
import {format} from 'date-fns';
import CustomDropdown from "@/components/microcomponents/custom-dropdown/custom-dropdown.component";
import Grid from "@/components/microcomponents/grid/grid.component";

const formSchema = z.object({
    email: z.string().email({message: 'Invalid email address'}),
    name: z.string().min(3, {message: 'Name must be longer than 2 characters'}),
    selectedValue: z.enum(['option1', 'option2', 'option3']).refine(value => value !== 'option3', {
        message: 'Option 3 is not allowed',
    }),
    password: z.string().min(8, {message: 'Password must be at least 8 characters long'}),
    selectedRadio: z.enum(['option 1', 'option 2', 'option 3'], {
        errorMap: (issue) => {
            if (issue.code === 'invalid_enum_value') {
                return {message: 'Please choose at least one option.'};
            }
            return {message: issue.message || 'Invalid value'};
        }
    }).refine(value => value !== 'option 3', {
        message: 'Option 3 is not allowed',
    }),
    isChecked: z.boolean().refine(value => value, {
        message: 'This checkbox must be checked',
    }),
});

const TheLab: React.FC = () => {
    const [formState, setFormState] = useState({
        email: '',
        name: '',
        password: '',
        selectedValue: 'option2',
        selectedRadio: '',
        isChecked: false,
        emailError: '',
        nameError: '',
        selectError: '',
        passwordError: '',
        radioError: '',
        checkboxError: ''
    });

    const [toggleState, setToggleState] = useState(false);
    const [color, setColor] = useState('purple');
    const [modalStates, setModalStates] = useState({
        isFirstModalOpen: false,
        isSecondModalOpen: false,
        isThirdModalOpen: false,
        isFourthModalOpen: false,
        isFifthModalOpen: false
    });
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [buttonIcon, setButtonIcon] = useState<string>('');
    const {theme} = useTheme();

    const iconOptions = [
        {value: '', label: 'No Icon', icon: ''},
        {value: 'fas fa-ban', label: 'Ban', icon: 'fas fa-ban'},
        {value: 'fas fa-check', label: 'Check', icon: 'fas fa-check'},
        {value: 'fas fa-user', label: 'User', icon: 'fas fa-user'},
        {value: 'fas fa-check-circle', label: 'Check Circle', icon: 'fas fa-check-circle'},
        {value: 'fas fa-exclamation-triangle', label: 'Exclamation Triangle', icon: 'fas fa-exclamation-triangle'},
        {value: 'fas fa-times-circle', label: 'Times Circle', icon: 'fas fa-times-circle'},
        {value: 'fas fa-info-circle', label: 'Info Circle', icon: 'fas fa-info-circle'},
        {value: 'fas fa-exclamation-circle', label: 'Exclamation Circle', icon: 'fas fa-exclamation-circle'},
        {value: 'fas fa-spinner', label: 'Spinner', icon: 'fas fa-spinner'},
        {value: 'fas fa-cog', label: 'Cog', icon: 'fas fa-cog'},
        {value: 'fas fa-copy', label: 'Copy', icon: 'fas fa-copy'},
        {value: 'fas fa-plus', label: 'Plus', icon: 'fas fa-plus'},
        {value: 'fas fa-minus', label: 'Minus', icon: 'fas fa-minus'},
        {value: 'fas fa-times', label: 'Times', icon: 'fas fa-times'},
        {value: 'fas fa-bars', label: 'Bars', icon: 'fas fa-bars'},
        {value: 'fas fa-search', label: 'Search', icon: 'fas fa-search'},
        {value: 'fas fa-chevron-left', label: 'Chevron Left', icon: 'fas fa-chevron-left'},
        {value: 'fas fa-chevron-right', label: 'Chevron Right', icon: 'fas fa-chevron-right'},
        {value: 'fas fa-chevron-up', label: 'Chevron Up', icon: 'fas fa-chevron-up'},
        {value: 'fas fa-chevron-down', label: 'Chevron Down', icon: 'fas fa-chevron-down'},
        {value: 'fas fa-arrow-left', label: 'Arrow Left', icon: 'fas fa-arrow-left'},
        {value: 'fas fa-arrow-right', label: 'Arrow Right', icon: 'fas fa-arrow-right'},
        {value: 'fas fa-arrow-up', label: 'Arrow Up', icon: 'fas fa-arrow-up'},
        {value: 'fas fa-arrow-down', label: 'Arrow Down', icon: 'fas fa-arrow-down'},
        {value: 'fas fa-angle-left', label: 'Angle Left', icon: 'fas fa-angle-left'},
        {value: 'fas fa-angle-right', label: 'Angle Right', icon: 'fas fa-angle-right'},
        {value: 'fas fa-angle-up', label: 'Angle Up', icon: 'fas fa-angle-up'},
        {value: 'fas fa-angle-down', label: 'Angle Down', icon: 'fas fa-angle-down'},
        {value: 'fas fa-caret-left', label: 'Caret Left', icon: 'fas fa-caret-left'},
        {value: 'fas fa-caret-right', label: 'Caret Right', icon: 'fas fa-caret-right'},
        {value: 'fas fa-caret-up', label: 'Caret Up', icon: 'fas fa-caret-up'},
        {value: 'fas fa-caret-down', label: 'Caret Down', icon: 'fas fa-caret-down'},
    ];


    useEffect(() => {
        const validateInitialState = () => {
            const result = formSchema.safeParse({
                email: formState.email,
                name: formState.name,
                selectedValue: formState.selectedValue,
                password: formState.password,
                selectedRadio: formState.selectedRadio,
                isChecked: formState.isChecked,
            });

            if (!result.success) {
                result.error.errors.forEach(error => {
                    switch (error.path[0]) {
                        case 'email':
                            setFormState(prevState => ({...prevState, emailError: error.message}));
                            break;
                        case 'name':
                            setFormState(prevState => ({...prevState, nameError: error.message}));
                            break;
                        case 'selectedValue':
                            setFormState(prevState => ({...prevState, selectError: error.message}));
                            break;
                        case 'password':
                            setFormState(prevState => ({...prevState, passwordError: error.message}));
                            break;
                        case 'selectedRadio':
                            setFormState(prevState => ({...prevState, radioError: error.message}));
                            break;
                        case 'isChecked':
                            setFormState(prevState => ({...prevState, checkboxError: error.message}));
                            break;
                    }
                });
            }
        };

        validateInitialState();
    }, []);

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
        const email = e.target.value;
        const result = formSchema.shape.email.safeParse(email);
        setFormState(prevState => ({
            ...prevState,
            email,
            emailError: result.success ? '' : result.error.errors[0].message
        }));
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value;
        const result = formSchema.shape.name.safeParse(name);
        setFormState(prevState => ({
            ...prevState,
            name,
            nameError: result.success ? '' : result.error.errors[0].message
        }));
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        const result = formSchema.shape.selectedValue.safeParse(selectedValue);
        setFormState(prevState => ({
            ...prevState,
            selectedValue,
            selectError: result.success ? '' : result.error.errors[0].message
        }));
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const password = e.target.value;
        const result = formSchema.shape.password.safeParse(password);
        setFormState(prevState => ({
            ...prevState,
            password,
            passwordError: result.success ? '' : result.error.errors[0].message
        }));
    };

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedRadio = e.target.value;
        const result = formSchema.shape.selectedRadio.safeParse(selectedRadio);
        setFormState(prevState => ({
            ...prevState,
            selectedRadio,
            radioError: result.success ? '' : result.error.errors[0].message
        }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        const result = formSchema.shape.isChecked.safeParse(isChecked);
        setFormState(prevState => ({
            ...prevState,
            isChecked,
            checkboxError: result.success ? '' : result.error.errors[0].message
        }));
    };

    const cardData = {
        columns: {
            make: 'Make',
            model: 'Model',
            vehicleAge: 'Vehicle Age'
        },
        rows: [
            {make: 'Ford', model: 'Cortina', vehicleAge: '6 months'},
            {make: 'Chevrolet', model: 'Impala', vehicleAge: '2 years'},
            {make: 'Toyota', model: 'Corolla', vehicleAge: '1 year'},
            {make: 'Honda', model: 'Civic', vehicleAge: '3 years'},
            {make: 'BMW', model: '3 Series', vehicleAge: '5 years'},
            {make: 'Audi', model: 'A4', vehicleAge: '4 years'},
            {make: 'Mercedes-Benz', model: 'C-Class', vehicleAge: '2 years'},
            {make: 'Volkswagen', model: 'Golf', vehicleAge: '6 months'},
            {make: 'Nissan', model: 'Altima', vehicleAge: '1 year'},
            {make: 'Hyundai', model: 'Elantra', vehicleAge: '3 years'}, {
                make: 'Ford',
                model: 'Cortina',
                vehicleAge: '6 months'
            },
            {make: 'Chevrolet', model: 'Impala', vehicleAge: '2 years'},
            {make: 'Toyota', model: 'Corolla', vehicleAge: '1 year'},
            {make: 'Honda', model: 'Civic', vehicleAge: '3 years'},
            {make: 'BMW', model: '3 Series', vehicleAge: '5 years'},
            {make: 'Audi', model: 'A4', vehicleAge: '4 years'},
            {make: 'Mercedes-Benz', model: 'C-Class', vehicleAge: '2 years'},
            {make: 'Volkswagen', model: 'Golf', vehicleAge: '6 months'},
            {make: 'Nissan', model: 'Altima', vehicleAge: '1 year'},
            {make: 'Hyundai', model: 'Elantra', vehicleAge: '3 years'},
        ]
    }

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

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

    const appointments: Date[] = [
        new Date(currentYear, currentMonth, 1),
        new Date(currentYear, currentMonth, 12),
        new Date(currentYear, currentMonth, 18),
        new Date(currentYear, currentMonth, 22),
        new Date(currentYear, currentMonth, 25),
        new Date(currentYear, currentMonth, 28),
        new Date(currentYear, currentMonth, 29),
    ];

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
                        <li>
                            <Link href="/app/the-lab/text-builder">Text Builder</Link>
                        </li>
                        <li>
                            <Link href="/app/the-lab/button-builder">Button Builder</Link>
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
                            Modal</Button>
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
                            value={formState.name}
                            onChange={handleNameChange}
                            error={formState.nameError}
                        />

                        <FormInput
                            id='email'
                            type="email"
                            label="Email"
                            value={formState.email}
                            onChange={handleEmailChange}
                            error={formState.emailError}
                        />

                        <hr/>
                        <div><b>Name:</b> {formState.name}</div>
                        <div><b>Email:</b> {formState.email}</div>
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
                    <h3>Form Radio/Group</h3>
                    <div className={styles['flex-buttons']}>
                        <FormRadioGroup label={'Form Group'} error={formState.radioError}>
                            <FormRadioInput
                                name={'radioGroup'}
                                value={'option 1'}
                                label='Option 1'
                                checked={formState.selectedRadio === 'option 1'}
                                onChange={handleRadioChange}
                                error={formState.radioError}
                            />
                            <FormRadioInput
                                name={'radioGroup'}
                                value={'option 2'}
                                label='Option 2'
                                checked={formState.selectedRadio === 'option 2'}
                                onChange={handleRadioChange}
                                error={formState.radioError}
                            />
                            <FormRadioInput
                                name={'radioGroup'}
                                value={'option 3'}
                                label='Option 3'
                                checked={formState.selectedRadio === 'option 3'}
                                onChange={handleRadioChange}
                                error={formState.radioError}
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
                    <h3>Form Password</h3>
                    <FormPassword
                        id='password'
                        label="Password"
                        value={formState.password}
                        onChange={handlePasswordChange}
                        error={formState.passwordError}
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
                        value={formState.selectedValue}
                        onChange={handleSelectChange}
                        error={formState.selectError}
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
                    <h3>Custom Dropdown</h3>
                    <CustomDropdown
                        options={iconOptions}
                        value={buttonIcon}
                        label="Icon Class"
                        onChange={(value) => setButtonIcon(value)}
                    />
                    <div className={styles.documentationBox}>
                        <div>{`<CustomDropdown options={iconOptions} value={buttonIcon} label="Icon Class" onChange={(value) => setButtonIcon(value)} />`}</div>
                    </div>
                    <div className={styles.parametersBox}>
                        <h5>Parameters:</h5>
                        <ul>
                            <li><code>options</code>: {`{ value: string, label: string, icon: string }[]`}</li>
                            <li><code>value</code>: string</li>
                            <li><code>label</code>: string</li>
                            <li><code>onChange</code>: function</li>
                        </ul>
                    </div>
                </div>
                <div className={styles.section}>
                    <h3>Form Checkbox</h3>
                    <div>
                        <FormCheckbox
                            id={'checkbox'}
                            label={'Form Checkbox'}
                            error={formState.checkboxError}
                            name={'checkbox'}
                            value={'checkbox'}
                            checked={formState.isChecked}
                            onChange={handleCheckboxChange}
                        />
                        <FormCheckbox
                            id={'checkbox2'}
                            label={'Form Checkbox 2'}
                            name={'checkbox2'}
                            value={'checkbox2'}
                        />
                        <FormCheckbox
                            id={'checkbox3'}
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
                    <h3>Date Picker/Calendar View</h3>
                    <div>
                        <DatePicker
                            selected={startDate}
                            onChange={(date: Date) => setStartDate(date)}
                            appointments={appointments}
                        />
                        <hr/>
                        <div>Chosen Date: {startDate ? format(startDate, 'do MMMM yyyy') : 'No date selected'}</div>
                    </div>
                    <div className={styles.documentationBox}>
                        <div>{`<DatePicker selected={startDate} onChange={(date: Date) => setStartDate(date)} />`}</div>
                    </div>
                    <div className={styles.parametersBox}>
                        <h5>Parameters:</h5>
                        <ul>
                            <li><code>selected</code>: Date</li>
                            <li><code>onChange</code>: function</li>
                            <li><code>appointments</code>: Date[] (optional)</li>
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
                    <Grid payload={cardData}>
                    </Grid>

                    <div className={styles.documentationBox}>
                    </div>
                    <div className={styles.parametersBox}>
                        <h5>Parameters:</h5>
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