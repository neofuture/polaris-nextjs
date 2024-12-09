"use client";

import React, {useState} from 'react';
import FormSelect from '@/components/microcomponents/form-select/form-select.component';
import FormCheckbox from '@/components/microcomponents/form-checkbox/form-checkbox.component';
import FormInput from '@/components/microcomponents/form-input/form-input.component';
import Text from '@/components/microcomponents/text/text.component';
import styles from '../lab.module.css';
import Button from "@/components/microcomponents/button/button.component";

const TextBuilder: React.FC = () => {
    const [element, setElement] = useState<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div' | 'a' | 'button' | 'label' | 'li' | 'ul' | 'ol' | 'nav' | 'section' | 'article' | 'header' | 'footer' | 'main'>('div');
    const [state, setState] = useState<'default' | 'success' | 'error' | 'warning' | 'info' | 'primary' | 'secondary' | 'inherit'>('default');
    const [size, setSize] = useState<'T900' | 'T800' | 'T700' | 'T600' | 'T500' | 'T400' | 'T300' | 'T200'>('T400');
    const [weight, setWeight] = useState<'200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'>('400');
    const [underline, setUnderline] = useState(false);
    const [italic, setItalic] = useState(false);
    const [strikethrough, setStrikethrough] = useState(false);
    const [textContent, setTextContent] = useState('The quick brown fox jumps over the lazy dog.');

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
                <h3>Example Text Builder</h3>
                <div className={styles['select-row']}>
                    <FormSelect
                        id='element'
                        label="Element"
                        value={element}
                        onChange={(e) => setElement(e.target.value as typeof element)}
                    >
                        <option value='a'>Anchor</option>
                        <option value='article'>Article</option>
                        <option value='button'>Button</option>
                        <option value='div'>Div</option>
                        <option value='footer'>Footer</option>
                        <option value='h1'>H1</option>
                        <option value='h2'>H2</option>
                        <option value='h3'>H3</option>
                        <option value='h4'>H4</option>
                        <option value='h5'>H5</option>
                        <option value='h6'>H6</option>
                        <option value='header'>Header</option>
                        <option value='label'>Label</option>
                        <option value='li'>List Item</option>
                        <option value='main'>Main</option>
                        <option value='nav'>Nav</option>
                        <option value='ol'>Ordered List</option>
                        <option value='p'>Paragraph</option>
                        <option value='section'>Section</option>
                        <option value='span'>Span</option>
                        <option value='ul'>Unordered List</option>
                    </FormSelect>

                    <FormSelect
                        id='state'
                        label="State"
                        value={state}
                        onChange={(e) => setState(e.target.value as typeof state)}
                    >
                        <option value='default'>Default</option>
                        <option value='primary'>Primary</option>
                        <option value='secondary'>Secondary</option>
                        <option value='success'>Success</option>
                        <option value='error'>Error</option>
                        <option value='warning'>Warning</option>
                        <option value='info'>Info</option>
                        <option value='inherit'>Inherit</option>
                    </FormSelect>

                    <FormSelect
                        id='size'
                        label="Size"
                        value={size}
                        onChange={(e) => setSize(e.target.value as typeof size)}
                    >
                        <option value='T900'>T900</option>
                        <option value='T800'>T800</option>
                        <option value='T700'>T700</option>
                        <option value='T600'>T600</option>
                        <option value='T500'>T500</option>
                        <option value='T400'>T400</option>
                        <option value='T300'>T300</option>
                        <option value='T200'>T200</option>
                    </FormSelect>

                    <FormSelect
                        id='weight'
                        label="Weight"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value as typeof weight)}
                    >
                        <option value='200'>Light (200)</option>
                        <option value='300'>Regular (300)</option>
                        <option value='400'>Normal (400)</option>
                        <option value='500'>Medium (500)</option>
                        <option value='600'>Semi-Bold (600)</option>
                        <option value='700'>Bold (700)</option>
                        <option value='800'>Extra-Bold (800)</option>
                        <option value='900'>Black (900)</option>
                    </FormSelect>
                </div>
                <div className={styles['select-row']}>
                    <FormCheckbox
                        id='underline'
                        label="Underline"
                        checked={underline}
                        onChange={(e) => setUnderline(e.target.checked)}
                        name={'underline'}
                        value={'true'}
                    />

                    <FormCheckbox
                        id='italic'
                        label="Italic"
                        checked={italic}
                        onChange={(e) => setItalic(e.target.checked)}
                        name={'italic'}
                        value={'true'}
                    />

                    <FormCheckbox
                        id='strikethrough'
                        label="Strikethrough"
                        checked={strikethrough}
                        onChange={(e) => setStrikethrough(e.target.checked)}
                        name={'strikethrough'}
                        value={'true'}
                    />
                </div>
                <div className={styles['select-row']}>
                    <FormInput
                        id='textContent'
                        type="text"
                        label="Text Content"
                        value={textContent}
                        onChange={(e) => setTextContent(e.target.value)}
                    />
                </div>
                <hr/>
                <div className={styles['example-text']}>
                    <Text as={element} state={state} size={size} weight={weight} underline={underline}
                          italic={italic} strikethrough={strikethrough}>
                        {textContent}
                    </Text>
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
                        {`<Text`}
                        {element !== 'div' && ` as="${element}"`}
                        {state !== 'default' && ` state="${state}"`}
                        {size !== 'T400' && ` size="${size}"`}
                        {weight !== '400' && ` weight="${weight}"`}
                        {underline && ` underline`}
                        {italic && ` italic`}
                        {strikethrough && ` strikethrough`}
                        {`>${textContent}</Text>`}
                    </div>
                </div>
                <div className={styles.parametersBox}>
                    <h5>Parameters:</h5>
                    <ul>
                        <li><code>as</code>: string (optional)</li>
                        <li><code>state</code>: string (optional)</li>
                        <li><code>size</code>: string (optional)</li>
                        <li><code>weight</code>: string (optional)</li>
                        <li><code>underline</code>: boolean (optional)</li>
                        <li><code>italic</code>: boolean (optional)</li>
                        <li><code>strikethrough</code>: boolean (optional)</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TextBuilder;