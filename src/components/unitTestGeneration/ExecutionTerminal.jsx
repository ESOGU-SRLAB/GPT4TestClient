import { ReactTerminal, TerminalContextProvider } from 'react-terminal';
import { useSelector } from 'react-redux';

const ExecutionTerminal = () => {
    const executionTerminalSettings = useSelector(
        (state) => state.terminalSettings.executionTerminalSettings
    );
    let { themes, selectedThemeName } = executionTerminalSettings;

    const commands = {
        'run-test': (args) => {
            console.log(args);
            return 'Ran!';
        },
    };

    return (
        <TerminalContextProvider>
            <ReactTerminal
                themes={themes}
                theme={selectedThemeName}
                prompt="$"
                commands={commands}
                errorMessage="Command does not exist!"
            />
        </TerminalContextProvider>
    );
};

export default ExecutionTerminal;
