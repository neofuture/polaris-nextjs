"use client";

import React, {useState} from 'react';
import styles from '../lab.module.css';
import Button from '@/components/microcomponents/button/button.component';
import FormSelect from '@/components/microcomponents/form-select/form-select.component';
import FormCheckbox from '@/components/microcomponents/form-checkbox/form-checkbox.component';
import FormInput from '@/components/microcomponents/form-input/form-input.component';
import CustomDropdown from "@/components/microcomponents/custom-dropdown/custom-dropdown.component";

const iconOptions = [
    { value: '', label: 'No Icon', icon: '' },
    { value: 'fas fa-ban', label: 'Ban', icon: 'fas fa-ban' },
    { value: 'fas fa-check', label: 'Check', icon: 'fas fa-check' },
    { value: 'fas fa-user', label: 'User', icon: 'fas fa-user' },
    { value: 'fas fa-check-circle', label: 'Check Circle', icon: 'fas fa-check-circle' },
    { value: 'fas fa-exclamation-triangle', label: 'Exclamation Triangle', icon: 'fas fa-exclamation-triangle' },
    { value: 'fas fa-times-circle', label: 'Times Circle', icon: 'fas fa-times-circle' },
    { value: 'fas fa-info-circle', label: 'Info Circle', icon: 'fas fa-info-circle' },
    { value: 'fas fa-exclamation-circle', label: 'Exclamation Circle', icon: 'fas fa-exclamation-circle' },
    { value: 'fas fa-spinner', label: 'Spinner', icon: 'fas fa-spinner' },
    { value: 'fas fa-cog', label: 'Cog', icon: 'fas fa-cog' },
    { value: 'fas fa-copy', label: 'Copy', icon: 'fas fa-copy' },
    { value: 'fas fa-plus', label: 'Plus', icon: 'fas fa-plus' },
    { value: 'fas fa-minus', label: 'Minus', icon: 'fas fa-minus' },
    { value: 'fas fa-times', label: 'Times', icon: 'fas fa-times' },
    { value: 'fas fa-bars', label: 'Bars', icon: 'fas fa-bars' },
    { value: 'fas fa-search', label: 'Search', icon: 'fas fa-search' },
    { value: 'fas fa-chevron-left', label: 'Chevron Left', icon: 'fas fa-chevron-left' },
    { value: 'fas fa-chevron-right', label: 'Chevron Right', icon: 'fas fa-chevron-right' },
    { value: 'fas fa-chevron-up', label: 'Chevron Up', icon: 'fas fa-chevron-up' },
    { value: 'fas fa-chevron-down', label: 'Chevron Down', icon: 'fas fa-chevron-down' },
    { value: 'fas fa-arrow-left', label: 'Arrow Left', icon: 'fas fa-arrow-left' },
    { value: 'fas fa-arrow-right', label: 'Arrow Right', icon: 'fas fa-arrow-right' },
    { value: 'fas fa-arrow-up', label: 'Arrow Up', icon: 'fas fa-arrow-up' },
    { value: 'fas fa-arrow-down', label: 'Arrow Down', icon: 'fas fa-arrow-down' },
    { value: 'fas fa-angle-left', label: 'Angle Left', icon: 'fas fa-angle-left' },
    { value: 'fas fa-angle-right', label: 'Angle Right', icon: 'fas fa-angle-right' },
    { value: 'fas fa-angle-up', label: 'Angle Up', icon: 'fas fa-angle-up' },
    { value: 'fas fa-angle-down', label: 'Angle Down', icon: 'fas fa-angle-down' },
    { value: 'fas fa-caret-left', label: 'Caret Left', icon: 'fas fa-caret-left' },
    { value: 'fas fa-caret-right', label: 'Caret Right', icon: 'fas fa-caret-right' },
    { value: 'fas fa-caret-up', label: 'Caret Up', icon: 'fas fa-caret-up' },
    { value: 'fas fa-caret-down', label: 'Caret Down', icon: 'fas fa-caret-down' },
];

const widthOptions = [
    {value: 'unset', label: 'Unset'},
    {value: '500px', label: '500px'},
    {value: '100%', label: '100%'},
];

const actionOptions = [
    {value: 'function', label: 'Function'},
    {value: 'href', label: 'Href'},
];

const ButtonBuilder = () => {
    const [buttonState, setButtonState] = useState<'default' | 'success' | 'error' | 'warning' | 'info' | 'primary' | 'secondary' | 'disabled'>('default');
    const [buttonSize, setButtonSize] = useState<'small' | 'tiny' | 'default'>('default');
    const [buttonIcon, setButtonIcon] = useState<string>('');
    const [buttonWidth, setButtonWidth] = useState<string>('unset');
    const [buttonRounded, setButtonRounded] = useState<boolean>(false);
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
    const [buttonText, setButtonText] = useState<string>('Button Text');
    const [actionType, setActionType] = useState<'function' | 'href'>('href');
    const [actionValue, setActionValue] = useState<string>('/app');

    const copyToClipboard = () => {
        const codeElement = document.querySelector(`#documentationBox > div`) as HTMLElement;
        if (codeElement) {
            navigator.clipboard.writeText(codeElement.textContent || '');
            alert('Copied to clipboard!');
        }
    };

    return (
        <div className={styles['outer-container']}>

            <div className={styles.section}>
                <h3>Button Builder</h3>
                <div className={styles['select-row']}>
                    <FormSelect
                        id='buttonState'
                        label="State"
                        value={buttonState}
                        onChange={(e) => setButtonState(e.target.value as 'default' | 'success' | 'error' | 'warning' | 'info' | 'primary' | 'secondary' | 'disabled')}
                    >
                        <option value='default'>Default</option>
                        <option value='primary'>Primary</option>
                        <option value='secondary'>Secondary</option>
                        <option value='success'>Success</option>
                        <option value='error'>Error</option>
                        <option value='warning'>Warning</option>
                        <option value='info'>Info</option>
                        <option value='disabled'>Disabled</option>
                    </FormSelect>
                    <FormSelect
                        id='buttonSize'
                        label="Size"
                        value={buttonSize}
                        onChange={(e) => setButtonSize(e.target.value as 'small' | 'tiny' | 'default')}
                    >
                        <option value='default'>Default</option>
                        <option value='small'>Small</option>
                        <option value='tiny'>Tiny</option>
                    </FormSelect>
                    <CustomDropdown
                        options={iconOptions}
                        value={buttonIcon}
                        label="Icon Class"
                        onChange={(value) => setButtonIcon(value)}
                    />
                    <FormSelect
                        id='buttonWidth'
                        label="Button Width"
                        value={buttonWidth}
                        onChange={(e) => setButtonWidth(e.target.value)}
                    >
                        {widthOptions.map((width) => (
                            <option key={width.value} value={width.value}>
                                {width.label}
                            </option>
                        ))}
                    </FormSelect>
                    <FormSelect
                        id='actionType'
                        label="Action Type"
                        value={actionType}
                        onChange={(e) => {
                            const newActionType = e.target.value as 'function' | 'href';
                            setActionType(newActionType);
                            setActionValue(newActionType === 'href' ? '/app' : '');
                        }}
                    >
                        {actionOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </FormSelect>
                </div>
                <div className={styles['select-row']}>
                    <FormCheckbox
                        id='buttonRounded'
                        label="Rounded"
                        checked={buttonRounded}
                        onChange={(e) => setButtonRounded(e.target.checked)} name={''} value={''}/>
                    <FormCheckbox
                        id='buttonDisabled'
                        label="Disabled"
                        checked={buttonDisabled}
                        onChange={(e) => setButtonDisabled(e.target.checked)} name={''} value={''}/>
                </div>
                <div className={styles['select-row']}>
                    <FormInput
                        id='buttonText'
                        type="text"
                        label="Button Text"
                        value={buttonText}
                        onChange={(e) => setButtonText(e.target.value)}
                    />
                </div>
                <hr/>
                <div className={styles['example-button']}>
                    <Button
                        onClick={actionType === 'function' ? () => alert('Button clicked!') : undefined}
                        href={actionType === 'href' ? actionValue : undefined}
                        iconName={buttonIcon}
                        state={buttonState}
                        size={buttonSize}
                        rounded={buttonRounded}
                        disabled={buttonDisabled}
                        width={buttonWidth}
                    >
                        {buttonText}
                    </Button>
                </div>
                <hr/>
                <div className={styles.documentationBox} id="documentationBox">
                    <Button
                        onClick={copyToClipboard}
                        iconName="fas fa-copy"
                        size="tiny"
                        className={styles.copyButton}
                    >
                        Copy
                    </Button>
                    <div>
                        {`<Button`}
                        {buttonIcon && ` iconName="${buttonIcon}"`}
                        {buttonState !== 'default' && ` state="${buttonState}"`}
                        {buttonSize !== 'default' && ` size="${buttonSize}"`}
                        {buttonRounded && ` rounded`}
                        {buttonDisabled && ` disabled`}
                        {buttonWidth !== 'unset' && ` width="${buttonWidth}"`}
                        {actionType === 'function' && ` onClick={() => alert('Button clicked!')}`}
                        {actionType === 'href' && ` href="${actionValue}"`}
                        {`>${buttonText}</Button>`}
                    </div>
                </div>
                <div className={styles.parametersBox}>
                    <h5>Parameters:</h5>
                    <ul>
                        <li><code>iconName</code>: string (optional)</li>
                        <li><code>label</code>: string (optional)</li>
                        <li><code>onClick</code>: function (optional)</li>
                        <li><code>href</code>: string (optional)</li>
                        <li><code>rounded</code>: boolean (optional)</li>
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
    );
};

export default ButtonBuilder;