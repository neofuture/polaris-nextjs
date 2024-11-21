"use client";

import React, { useState } from 'react';
import NavLink from '@/components/microcomponents/nav-link/nav-link.component';
import Button from '@/components/microcomponents/button/button.component';
import ColorPicker from "@/components/color-picker/color-picker.component";
import ToggleSwitch from "@/components/microcomponents/toggle-switch/toggle-switch.component";
import styles from './lab.module.css';

export default function Lab() {
    const [toggleState, setToggleState] = useState(false);
    const [color, setColor] = useState('purple');


    const handleToggle = () => {
        setToggleState(!toggleState);
    };


    return (
        <div className={styles['container']}>
            <h1><i className={'fad fa-flask'}/> The Lab</h1>
            <h4>Welcome to the lab!</h4>
            <div className={styles.section}>
                <h3>NavLink</h3>
                <NavLink onClick={() => alert('NavLink clicked')}>Go to example</NavLink>
                <div className={styles.documentationBox}>
                    {`<NavLink onClick={() => alert('NavLink clicked')}/>Go to example</NavLink>`}
                </div>
                <div className={styles.parametersBox}>
                    <h5>Parameters:</h5>
                    <ul>
                        <li><code>iconName</code>: string (optional)</li>
                        <li><code>href</code>: string (optional)</li>
                        <li><code>onClick</code>: function (optional)</li>
                        <li><code>exact</code>: boolean (optional)</li>
                    </ul>
                </div>
            </div>

            <div className={styles.section}>
                <h3>Button</h3>
                <Button onClick={() => alert('Button clicked!')}>Click me</Button>
                <div className={styles.documentationBox}>
                    {`<Button onClick={() => alert('Button clicked!')}>Click me</Button>`}
                </div>
                <div className={styles.parametersBox}>
                    <h5>Parameters:</h5>
                    <ul>
                        <li><code>iconName</code>: string (optional)</li>
                        <li><code>label</code>: string (optional)</li>
                        <li><code>onClick</code>: function (optional)</li>
                        <li><code>rounded</code>: boolean (optional)</li>
                        <li><code>className</code>: string (optional)</li>
                        <li><code>href</code>: string (optional)</li>
                    </ul>
                </div>
            </div>

            <div className={styles.section}>
                <h3>Toggle</h3>
                <ToggleSwitch initialState={false} onToggle={handleToggle} viewStateOn='On' viewStateOff='Off'/>
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
                <ColorPicker selectedColor={color} onColorSelect={setColor}/>
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
        </div>
    );
}