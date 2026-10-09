import type { InputHTMLAttributes, JSX } from "react";

interface CampoProps extends InputHTMLAttributes<HTMLInputElement> {
    rotulo: string;
}

function Campo({ rotulo, id, ...resto }: CampoProps): JSX.Element {
    return (
        <div className="flex-1">
            <label htmlFor={id} className="block text-sm font-semibold text-slate-700 mb-2">
                {rotulo}
            </label>
            <input
                id={id}
                {...resto}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-emerald-600 focus:outline-none transition-all placeholder:text-slate-400"
            />
        </div>
    );
}

export default Campo;