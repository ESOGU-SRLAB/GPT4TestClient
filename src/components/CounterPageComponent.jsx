import { useDispatch, useSelector } from 'react-redux';
import {
    decrement,
    increment,
    incrementByAmount,
} from '../redux/features/counterSlice';

const CounterPageComponent = () => {
    const dispatch = useDispatch();
    const { counter } = useSelector((state) => state.counter);
    return (
        <div>
            <button onClick={() => dispatch(decrement())}>-</button>
            <span>{counter}</span>
            <button onClick={() => dispatch(increment())}>+</button>
            <button onClick={() => dispatch(incrementByAmount(10))}>++</button>
        </div>
    );
};

export default CounterPageComponent;
