import { ReactTerminal, TerminalContextProvider } from 'react-terminal';
import { useSelector } from 'react-redux';

const SpecialCommandTerminal = () => {
    const specialCommandTerminalSettings = useSelector(
        (state) => state.terminalSettings.specialCommandTerminalSettings
    );
    let { themes, selectedThemeName } = specialCommandTerminalSettings;

    const commands = {
        'model-settings': (args) => {
            console.log(args);
            return 'Ran!';
        },
    };

    return (
        <TerminalContextProvider>
            <ReactTerminal
                // showControlBar={false}
                themes={themes}
                theme={selectedThemeName}
                prompt="$"
                commands={commands}
                errorMessage="Command does not exist!"
            />
        </TerminalContextProvider>
    );
};

export default SpecialCommandTerminal;
