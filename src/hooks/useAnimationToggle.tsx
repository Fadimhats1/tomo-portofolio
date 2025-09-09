import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface AnimationToggleProps {
    children: (state: AnimationToggleState['state'], toggle: () => void, open: () => void, close: () => void) => React.ReactNode;
    isOutsideParent?: boolean;
    onShow?: () => void;
    onShowed?: () => void;
    onHide?: () => void;
    onHidden?: () => void;
    animation?: {
        duration: number;
    };
}

interface AnimationToggleState {
    state: 'onShow' | 'showed' | 'onHide' | 'idle';
}

export const useAnimationToggle = ({ animation = { duration: 300 }, ...props }: AnimationToggleProps) => {
    const [animationState, setAnimationState] = useState<AnimationToggleState>({
        state: 'idle',
    });

    const state = animationState.state;

    const toggle = useCallback(() => {
        setAnimationState(prev => {
            if (prev.state !== 'idle' && prev.state !== 'showed') return prev;

            return {
                ...prev,
                state: prev.state === 'idle' ? 'onShow' : 'onHide',
            };
        });
    }, []);

    const open = useCallback((isForced: boolean = false) => {
        setAnimationState(prev => {
            if (prev.state !== 'idle') return prev;

            return {
                ...prev,
                state: isForced ? 'showed' : 'onShow',
            };
        });
    }, []);

    const close = useCallback((isForced: boolean = false) => {
        setAnimationState(prev => {
            if (prev.state !== 'showed') return prev;

            return {
                ...prev,
                state: isForced ? 'idle' : 'onHide',
            };
        });
    }, []);

    useEffect(() => {
        let timer: number;

        if (state === 'onShow') {
            props.onShow?.();

            timer = window.setTimeout(() => {
                setAnimationState(prev => ({ ...prev, state: 'showed' }));

                props.onShowed?.();
            }, 10);
        } else if (state === 'onHide') {
            props.onHide?.();

            timer = window.setTimeout(() => {
                setAnimationState(prev => ({ ...prev, state: 'idle' }));

                props.onHidden?.();
            }, animation.duration);
        }
        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [state]);

    const element =
        state === 'idle'
            ? null
            : props.isOutsideParent
              ? createPortal(props.children(state, toggle, open, close), document.body)
              : props.children(state, toggle, open, close);

    return {
        state,
        element,
        toggle,
        open,
        close,
    };
};
