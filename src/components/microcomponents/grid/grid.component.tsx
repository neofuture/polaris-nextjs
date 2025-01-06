import React, { useState, useRef, useEffect } from 'react';
import styles from './grid.module.css';

interface GridProps {
    payload: {
        columns: { [key: string]: string };
        rows: { [key: string]: string }[];
    };
}

const Grid: React.FC<GridProps> = ({ payload }) => {
    const [columnWidths, setColumnWidths] = useState<{ [key: string]: number }>({});
    const tableRef = useRef<HTMLTableElement>(null);

    useEffect(() => {
        const containerWidth = tableRef.current?.offsetWidth || 0;
        const initialWidths: { [key: string]: number } = {};
        const columnCount = Object.keys(payload.columns).length;

        Object.keys(payload.columns).forEach(key => {
            initialWidths[key] = Math.floor(containerWidth / columnCount);
        });
        setColumnWidths(initialWidths);
    }, [payload.columns]);

    const handleMouseDown = (e: React.MouseEvent, key: string) => {
        const startX = e.clientX;
        const startWidth = columnWidths[key];
        const columnKeys = Object.keys(payload.columns);
        const columnIndex = columnKeys.indexOf(key);
        const nextColumnKey = columnKeys[columnIndex + 1];
        const startNextWidth = columnWidths[nextColumnKey];

        const handleMouseMove = (e: MouseEvent) => {
            const deltaX = e.clientX - startX;
            const newWidth = startWidth + deltaX;
            const newNextWidth = startNextWidth - deltaX;

            if (newWidth >= 30 && newNextWidth >= 30) {
                setColumnWidths(prevWidths => ({
                    ...prevWidths,
                    [key]: newWidth,
                    [nextColumnKey]: newNextWidth
                }));
            }
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.body.classList.remove('no-select');
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        document.body.classList.add('no-select');
    };

    return (
        <div className={styles.tableContainer}>
            <table ref={tableRef} style={{ width: '100%', tableLayout: 'fixed' }}>
                <thead>
                <tr>
                    {Object.keys(payload.columns).map((key, index) => (
                        <th key={key} style={{ width: columnWidths[key] }}>
                            <span>
                               {payload.columns[key]}
                            </span>
                            {index < Object.keys(payload.columns).length - 1 && (
                                <div
                                    className={styles.resizer}
                                    onMouseDown={(e) => handleMouseDown(e, key)}
                                />
                            )}
                        </th>
                    ))}
                </tr>
                </thead>
            </table>
            <table className={styles.tableBody}>
                <tbody className={styles.tableBody}>
                {payload.rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {Object.keys(payload.columns).map(key => (
                            <td key={key} style={{ width: columnWidths[key] }}>
                                {row[key]}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Grid;