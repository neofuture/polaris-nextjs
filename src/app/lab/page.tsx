"use client";

import React, { useState } from 'react';
import Toggle from '@/components/microcomponents/toggle/toggle.component';
import NavLink from '@/components/microcomponents/nav-link/nav-link.component';
import Button from '@/components/microcomponents/button/button.component';
import styles from './lab.module.css';

export default function Lab() {
    const [toggleState, setToggleState] = useState(false);

    const handleToggle = () => {
        setToggleState(!toggleState);
    };

    return (
        <div className={styles['container']}>
            <h1>Lab</h1>
            <h4>Welcome to the lab!</h4>
            <div className={styles.section}>
                <h5>NavLink Example</h5>
                <NavLink onClick={() => alert('NavLink clicked')}>Go to example</NavLink>
                <div className={styles.documentationBox}>
                    {`<NavLink onClick={() => alert('NavLink clicked')}/>Go to example</NavLink>`}
                </div>
                <div className={styles.parametersBox}>
                    <h6>Parameters:</h6>
                    <ul>
                        <li><code>iconName</code>: string (optional)</li>
                        <li><code>href</code>: string (optional)</li>
                        <li><code>onClick</code>: function (optional)</li>
                        <li><code>exact</code>: boolean (optional)</li>
                    </ul>
                </div>
            </div>

            <div className={styles.section}>
                <h5>Button Example</h5>
                <Button onClick={() => alert('Button clicked!')}>Click me</Button>
                <div className={styles.documentationBox}>
                    {`<Button onClick={() => alert('Button clicked!')}>Click me</Button>`}
                </div>
                <div className={styles.parametersBox}>
                    <h6>Parameters:</h6>
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
                <h5>Toggle Example</h5>
                <Toggle initialState={false} onToggle={handleToggle} viewStateOn='On' viewStateOff='Off'/>
                <div className={styles.documentationBox}>
                    {`<Toggle initialState={false} onToggle={handleToggle} viewStateOn='On' viewStateOff='Off' />`}
                </div>
                <div className={styles.parametersBox}>
                    <h6>Parameters:</h6>
                    <ul>
                        <li><code>initialState</code>: boolean</li>
                        <li><code>onToggle</code>: function</li>
                        <li><code>viewStateOn</code>: string (optional)</li>
                        <li><code>viewStateOff</code>: string (optional)</li>
                    </ul>
                </div>
            </div>

        </div>
    );
}