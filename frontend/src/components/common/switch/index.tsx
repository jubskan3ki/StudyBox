import type { SwitchProps } from '~/types/components/common/switch.interface';

function Switch({ label, isChecked, onChange }: SwitchProps) {
    return (
        <div className="switch-container">
            <label htmlFor="switch-input" className="switch">
                <input id="switch-input" type="checkbox" checked={isChecked} onChange={onChange} />
                <span className="slider" />
            </label>
            <label htmlFor="switch-input" className="switch-label">
                {label}
            </label>
        </div>
    );
}

export default Switch;
