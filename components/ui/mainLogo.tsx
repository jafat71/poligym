

import { MainLogoColorSchema } from '@/types/interfaces/ui';
import React from 'react';
import { Svg, Path } from 'react-native-svg';

const MainLogoCustomComponent = ({ principal = "#FFFFFF", secondary = "#E11F1C", width = "250px", height = "250px" }: MainLogoColorSchema) => {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 85 59"
            fill="none"
        >
            <Path
                fill={principal}
                d="M61.033.24c-1.989.588-3.673 1.276-5.025 2.038-3.419 1.938-5.634 4.796-6.695 8.606-.114.406-.206.762-.206.795 0 .033.206-.008.453-.083 2.938-.952 5.86-.166 7.793 2.104.764.894 1.436 2.236 1.734 3.445.184.77.269 2.56.155 3.52-.403 3.496-2.498 6.544-5.322 7.77-.99.43-1.444.514-2.725.514-1.33 0-2.017-.141-3.064-.63-.566-.265-.743-.39-1.352-.97-.446-.413-1.026-.786-1.196-.744-.085.016-.163.414-.375 1.888-.41 2.858-.687 3.96-1.232 4.92-.488.861-1.04 1.184-1.875 1.093-.354-.033-.531-.108-.793-.315-.99-.795-1.43-2.41-1.833-6.758-.043-.506-.106-.928-.135-.928-.028 0-.19.124-.36.273-2.577 2.295-6.18 2.676-9.208.978-1.203-.68-2.392-1.856-3.1-3.073-.425-.729-.814-1.748-1.04-2.7-.178-.754-.192-.945-.192-2.353 0-1.325.021-1.623.156-2.203.56-2.418 1.692-4.133 3.433-5.21 1.316-.811 2.498-1.01 4.395-.754.538.075 1.28.133 1.649.133.658 0 .665 0 .615-.19-.127-.497-.573-1.732-.792-2.212-.602-1.3-.878-1.78-1.6-2.8-2.151-3.023-5.655-5.118-10.12-6.046L22.41.182l.043.373c.05.464.261 1.035.51 1.375.424.596.849.886 3 2.07.453.25 1.076.763 1.373 1.136.467.588.63 1.051.637 1.863.007.96-.142 1.325-1.45 3.479-.843 1.391-1.225 2.137-1.643 3.18-.884 2.253-1.182 3.711-1.182 5.873 0 2.427.418 4.274 1.387 6.17.588 1.135 1.522 2.328 2.47 3.131.659.555 2.046 1.342 2.831 1.607 2.088.696 4.389.613 6.745-.256.418-.15.758-.265.765-.257.007.008.113.48.24 1.052.793 3.545 1.932 5.3 3.673 5.649a3.035 3.035 0 0 0 2.902-1.036c.743-.886 1.005-1.507 1.847-4.44.192-.654.361-1.2.376-1.217.014-.025.325.083.693.224 2.824 1.085 5.556 1.01 7.828-.216 2.166-1.168 3.977-3.669 4.827-6.65.46-1.616.538-2.262.538-4.407 0-1.731-.022-2.046-.17-2.858-.234-1.284-.574-2.451-1.02-3.503-.523-1.234-.962-1.988-1.634-2.808-.821-1.01-1.076-1.474-1.175-2.162-.149-1.044.134-2.013.8-2.775.417-.463.856-.778 2.066-1.482 1.196-.688 1.784-1.118 2.06-1.5.262-.364.453-.886.502-1.383L62.293 0l-.24.008c-.135 0-.588.108-1.02.232Z"
            />
            <Path
                fill={secondary}
                d="M40.65 3.123c-1.953.124-5.046.67-5.294.936-.035.033.142.505.396 1.043.248.547.715 1.582 1.04 2.311.56 1.26 1.246 2.816 1.728 3.893.127.273.368.87.538 1.325 1.535 4.059 2.731 5.848 3.616 5.425.467-.231 1.097-1.176 1.869-2.816.46-.985 4.862-11.355 4.834-11.388-.015-.009-.432-.1-.942-.2-2.378-.455-5.52-.67-7.785-.53ZM32.1 13.584c-2.031.406-3.51 1.839-4.063 3.934-.099.398-.127.754-.12 1.74.007 1.093.028 1.333.198 1.971.758 2.94 2.548 5.036 4.785 5.616.672.174 1.953.132 2.632-.075 2.435-.762 4.02-2.435 4.728-4.986.212-.762.27-2.178.113-2.899-.382-1.79-1.535-3.272-3.333-4.307-.885-.514-1.798-.861-2.583-.994-.545-.091-1.876-.091-2.357 0Zm2.972 1.78c1.543.481 2.753 1.425 3.419 2.66.382.704.495 1.11.545 1.896.134 2.195-1.295 4.365-3.27 4.97-1.897.588-4.098-.124-5.393-1.731-.984-1.218-1.394-2.866-1.125-4.514.269-1.698 1.061-2.758 2.448-3.28.9-.348 2.286-.348 3.376 0Z"
            />
            <Path
                fill={principal}
                d="M33.855 16.185c-1.372.331-2.144 1.391-2.215 3.048-.035.903.135 1.64.552 2.369.305.53.552.787 1.062 1.101.283.174.41.2 1.097.2.708 0 .814-.026 1.189-.241 1.16-.663 1.897-2.386 1.699-3.976-.241-1.971-1.55-2.932-3.383-2.501Z"
            />
            <Path
                fill={secondary}
                d="M50.381 13.584c-.7.133-1.649.497-2.37.911-1.827 1.044-2.853 2.286-3.405 4.1-.198.663-.184 2.303.028 3.106.736 2.75 2.661 4.647 5.245 5.177.75.157 1.175.157 1.953 0 1.925-.398 3.596-1.98 4.537-4.307.523-1.292.63-1.864.63-3.396-.007-1.234-.022-1.367-.199-1.947-.424-1.358-1.139-2.319-2.2-2.94-.998-.588-1.452-.712-2.733-.745-.601-.017-1.273 0-1.486.041ZM53 15.282c1.727.522 2.753 2.112 2.76 4.282.007 2.65-1.585 4.796-4.006 5.384-1.203.29-2.456.133-3.447-.43-.891-.506-1.556-1.268-1.981-2.279-.602-1.433-.616-2.675-.043-3.942.722-1.582 2.598-2.9 4.523-3.172.481-.067 1.748.024 2.194.157Z"
            />
            <Path
                fill={principal}
                d="M49.497 16.185c-.708.207-1.21.67-1.522 1.408-.779 1.847-.085 4.232 1.486 5.094.34.19.482.215 1.133.215.65 0 .785-.025 1.097-.207.976-.572 1.592-1.855 1.592-3.313 0-1.085-.248-1.797-.85-2.435-.679-.72-1.945-1.044-2.936-.762Z"
            />
            <Path
                fill={principal}
                d="M61.034.24c-1.989.588-3.673 1.276-5.025 2.038-3.419 1.938-5.634 4.795-6.695 8.605-.114.406-.206.763-.206.796 0 .033.206-.009.453-.083 2.938-.953 5.86-.166 7.793 2.104.764.894 1.436 2.236 1.734 3.445.184.77.269 2.56.155 3.52-.403 3.496-2.498 6.544-5.322 7.77-.99.43-1.444.513-2.725.513-1.33 0-2.017-.14-3.064-.63-.566-.264-.743-.389-1.352-.968-.446-.415-1.026-.787-1.196-.746-.085.017-.163.414-.375 1.889-.41 2.857-.687 3.959-1.232 4.92-.488.861-1.04 1.184-1.875 1.093-.354-.033-.531-.108-.793-.315-.99-.795-1.43-2.41-1.833-6.759-.042-.505-.106-.927-.135-.927-.028 0-.19.124-.36.273-2.577 2.295-6.18 2.675-9.208.978-1.203-.68-2.392-1.856-3.1-3.073-.425-.73-.814-1.748-1.04-2.7-.178-.754-.192-.945-.192-2.353 0-1.325.021-1.623.156-2.203.56-2.419 1.691-4.133 3.433-5.21 1.316-.812 2.498-1.01 4.395-.754.538.075 1.28.133 1.649.133.658 0 .665 0 .616-.19-.128-.498-.574-1.732-.793-2.212-.602-1.3-.878-1.781-1.6-2.8-2.151-3.023-5.655-5.119-10.12-6.046l-.765-.166.043.373c.05.464.261 1.035.51 1.375.424.596.849.886 3 2.07.453.249 1.076.763 1.373 1.135.467.588.63 1.052.637 1.864.007.96-.142 1.325-1.45 3.479-.843 1.391-1.225 2.137-1.643 3.18-.885 2.253-1.182 3.71-1.182 5.873 0 2.427.418 4.274 1.387 6.17.588 1.135 1.522 2.328 2.47 3.131.659.555 2.046 1.342 2.831 1.607 2.088.696 4.388.613 6.745-.257.418-.149.758-.265.765-.256.007.008.113.48.24 1.052.793 3.544 1.932 5.3 3.674 5.648a3.036 3.036 0 0 0 2.901-1.035c.743-.886 1.005-1.507 1.847-4.44.192-.654.361-1.2.376-1.217.014-.025.325.083.693.223 2.824 1.086 5.556 1.011 7.828-.215 2.166-1.168 3.977-3.67 4.827-6.65.46-1.616.538-2.262.538-4.407 0-1.731-.022-2.046-.17-2.858-.234-1.284-.574-2.452-1.02-3.504-.523-1.234-.962-1.987-1.634-2.807-.821-1.01-1.076-1.475-1.175-2.162-.149-1.044.134-2.013.8-2.775.417-.464.856-.778 2.066-1.483 1.196-.687 1.784-1.118 2.06-1.499.262-.364.453-.886.502-1.383L62.294 0l-.24.008c-.135 0-.588.108-1.02.232Z"
            />
            <Path
                fill={principal}
                d="M40.651 3.123c-1.953.124-5.046.67-5.294.936-.035.033.142.505.396 1.043.248.547.715 1.582 1.04 2.311.56 1.26 1.246 2.816 1.728 3.893.127.273.368.87.538 1.325 1.535 4.059 2.732 5.848 3.616 5.425.467-.231 1.097-1.176 1.869-2.816.46-.985 4.862-11.355 4.834-11.388-.015-.009-.432-.1-.942-.2-2.378-.455-5.52-.67-7.785-.53ZM32.1 13.584c-2.03.406-3.51 1.838-4.062 3.934-.099.398-.127.754-.12 1.74.007 1.093.028 1.333.198 1.97.758 2.941 2.548 5.037 4.785 5.616.672.174 1.953.133 2.632-.074 2.435-.762 4.02-2.435 4.728-4.986.212-.762.27-2.179.113-2.9-.382-1.788-1.535-3.271-3.333-4.306-.885-.514-1.798-.862-2.583-.994-.545-.091-1.876-.091-2.357 0Zm2.973 1.78c1.543.481 2.754 1.425 3.419 2.66.382.703.495 1.11.545 1.896.134 2.195-1.295 4.365-3.27 4.97-1.897.588-4.098-.125-5.393-1.731-.984-1.218-1.394-2.866-1.125-4.514.268-1.698 1.061-2.759 2.448-3.28.9-.348 2.286-.348 3.376 0Z"
            />
            <Path
                fill={principal}
                d="M33.856 16.184c-1.373.332-2.144 1.392-2.215 3.049-.035.902.135 1.64.552 2.369.305.53.552.786 1.062 1.101.283.174.41.199 1.097.199.708 0 .814-.025 1.189-.24 1.16-.663 1.897-2.386 1.699-3.976-.241-1.971-1.55-2.932-3.384-2.502ZM50.382 13.584c-.7.132-1.649.497-2.37.91-1.827 1.045-2.853 2.287-3.405 4.1-.198.663-.184 2.303.028 3.107.736 2.75 2.661 4.646 5.245 5.177.75.157 1.175.157 1.953 0 1.925-.398 3.596-1.98 4.537-4.308.524-1.292.63-1.863.63-3.395-.007-1.235-.022-1.367-.199-1.947-.424-1.358-1.139-2.319-2.2-2.94-.998-.588-1.451-.713-2.733-.746-.601-.016-1.274 0-1.486.042Zm2.619 1.698c1.727.521 2.753 2.112 2.76 4.282.007 2.65-1.585 4.796-4.006 5.384-1.203.29-2.456.132-3.447-.431-.891-.505-1.556-1.267-1.981-2.278-.602-1.433-.616-2.675-.043-3.942.722-1.582 2.598-2.9 4.523-3.173.481-.066 1.748.025 2.194.158Z"
            />
            <Path
                fill={principal}
                d="M49.498 16.184c-.708.208-1.21.671-1.522 1.409-.779 1.847-.085 4.232 1.486 5.093.34.191.482.216 1.133.216.65 0 .785-.025 1.097-.207.976-.572 1.592-1.856 1.592-3.313 0-1.085-.248-1.798-.85-2.436-.679-.72-1.945-1.043-2.936-.762Z"
            />
            <Path
                fill={principal}
                d="M17.732 27.913c-.877.245-1.389.693-1.779 1.555l-.21.465v26.962l.21.465c.3.668.658 1.057 1.268 1.37.47.236.609.27 1.234.27 1.219.008 2.104-.482 2.567-1.428l.244-.5.024-13.54c.016-13.523.016-13.549-.154-14.013-.3-.837-1.072-1.471-2.04-1.657-.543-.11-.828-.102-1.364.05ZM65.764 27.833c-.91.203-1.673.837-1.998 1.674l-.187.482-.024 12.847c-.008 7.455.008 13.135.057 13.549.097.93.39 1.538.942 1.978.585.456 1.08.617 1.917.608.625 0 .763-.033 1.234-.27.61-.313.967-.702 1.268-1.37l.21-.464.025-13.101c.016-9.196-.008-13.27-.065-13.659-.22-1.352-1.153-2.198-2.55-2.308a3.227 3.227 0 0 0-.829.034ZM11.234 30.17a2.688 2.688 0 0 0-1.941 1.698l-.17.482v22.128l.17.49a2.778 2.778 0 0 0 1.397 1.513c.438.212.6.245 1.234.237.626 0 .805-.034 1.235-.237.617-.296 1.153-.862 1.373-1.445.146-.406.154-.786.154-11.664V32.13l-.227-.482c-.544-1.157-1.917-1.783-3.225-1.479ZM72.445 30.139a2.85 2.85 0 0 0-1.982 1.597l-.171.389v11.241c0 10.878.008 11.259.154 11.665.22.583.756 1.149 1.373 1.445.43.203.61.236 1.235.236.633.009.796-.025 1.234-.236.618-.296 1.154-.862 1.373-1.445.146-.406.154-.787.154-11.665V32.125l-.227-.482c-.528-1.124-1.893-1.766-3.143-1.504ZM4.914 33.325c-.438.144-.901.474-1.145.803-.39.558-.414.778-.414 3.635v2.68l-.634.05c-.885.067-1.478.321-1.965.82-.504.532-.748 1.174-.756 1.986-.016 1.673 1.007 2.79 2.656 2.89l.699.051v2.68c0 3.06.032 3.245.61 3.854.495.507 1.12.735 1.908.693.999-.06 1.665-.507 2.047-1.378l.187-.422v-16.66l-.244-.498c-.52-1.065-1.779-1.564-2.949-1.184ZM78.394 32.611c-.61.229-.991.584-1.275 1.158l-.244.508v16.651l.187.422c.382.87 1.048 1.319 2.047 1.378.796.042 1.389-.178 1.9-.702.593-.625.618-.769.618-3.846v-2.679l.698-.05c1.47-.11 2.388-.913 2.632-2.325.228-1.344-.455-2.696-1.6-3.144a4.773 4.773 0 0 0-1.097-.228l-.633-.051v-2.68c0-3.017-.033-3.211-.56-3.786-.659-.702-1.763-.964-2.673-.626ZM25.355 42.7c.546 0 1.02.09 1.422.27.408.18.72.438.936.774.216.336.324.735.324 1.197 0 .456-.108.855-.324 1.197a2.07 2.07 0 0 1-.936.774c-.402.18-.876.27-1.422.27h-1.422V49h-1.17v-6.3h2.592Zm-.054 3.492c.51 0 .897-.108 1.161-.324.264-.216.396-.525.396-.927s-.132-.711-.396-.927c-.264-.216-.65-.324-1.16-.324h-1.369v2.502h1.368Zm5.939 2.871c-.486 0-.924-.105-1.314-.315a2.338 2.338 0 0 1-.918-.873 2.53 2.53 0 0 1-.324-1.278c0-.474.108-.897.324-1.269.222-.372.528-.663.918-.873.39-.21.828-.315 1.314-.315.492 0 .933.105 1.323.315.39.21.693.501.909.873.222.372.333.795.333 1.269 0 .474-.111.9-.333 1.278a2.275 2.275 0 0 1-.909.873c-.39.21-.831.315-1.323.315Zm0-.963c.414 0 .756-.138 1.026-.414.27-.276.405-.639.405-1.089 0-.45-.135-.813-.405-1.089s-.612-.414-1.026-.414c-.414 0-.756.138-1.026.414-.264.276-.396.639-.396 1.089 0 .45.132.813.396 1.089.27.276.612.414 1.026.414Zm5.225.963c-.498 0-.888-.135-1.17-.405-.276-.276-.414-.663-.414-1.161v-5.175h1.125v5.094c0 .48.225.72.675.72.15 0 .285-.03.405-.09l.054.9c-.21.078-.435.117-.675.117Zm1.44-4.869h1.124V49h-1.125v-4.806Zm.566-.792a.732.732 0 0 1-.513-.189.646.646 0 0 1-.207-.486c0-.192.07-.351.207-.477a.713.713 0 0 1 .513-.198c.204 0 .375.063.513.189.138.12.207.273.207.459a.694.694 0 0 1-.72.702Zm6.445 2.376h1.107V49h-.963v-.369c-.45.306-1.014.459-1.692.459a3.428 3.428 0 0 1-1.602-.378 2.939 2.939 0 0 1-1.17-1.098c-.288-.48-.432-1.053-.432-1.719 0-.63.147-1.194.44-1.692a3.04 3.04 0 0 1 1.216-1.17 3.632 3.632 0 0 1 1.755-.423c.528 0 1.008.087 1.44.261.432.174.795.429 1.089.765l-.738.72a2.367 2.367 0 0 0-1.737-.72c-.444 0-.84.096-1.188.288-.342.186-.612.45-.81.792a2.349 2.349 0 0 0-.288 1.17c0 .462.096.861.288 1.197.198.33.459.582.783.756.324.168.678.252 1.062.252.27 0 .528-.042.774-.126.252-.084.474-.207.666-.369v-1.818Zm7.195-1.584v4.077c0 1.692-.831 2.538-2.493 2.538-.438 0-.858-.06-1.26-.18a2.572 2.572 0 0 1-.981-.504l.504-.846c.204.174.453.312.747.414.294.102.603.153.927.153.492 0 .852-.12 1.08-.36.234-.234.351-.597.351-1.089v-.225a1.83 1.83 0 0 1-.657.459 2.256 2.256 0 0 1-.837.153c-.642 0-1.149-.177-1.521-.531-.366-.354-.549-.885-.549-1.593v-2.466h1.125v2.322c0 .426.096.747.288.963.198.21.477.315.837.315.402 0 .72-.123.954-.369.24-.246.36-.603.36-1.071v-2.16h1.125Zm7.539-.054c.606 0 1.086.177 1.44.531.354.348.531.873.531 1.575V49h-1.125v-2.61c0-.42-.093-.735-.279-.945-.186-.216-.453-.324-.801-.324-.378 0-.681.126-.909.378-.228.246-.342.6-.342 1.062V49H57.04v-2.61c0-.42-.093-.735-.279-.945-.186-.216-.453-.324-.801-.324-.384 0-.69.123-.918.369-.222.246-.333.603-.333 1.071V49h-1.125v-4.806h1.071v.612a1.75 1.75 0 0 1 .675-.495c.27-.114.57-.171.9-.171.36 0 .678.069.954.207.282.132.504.33.666.594.198-.252.453-.447.765-.585a2.44 2.44 0 0 1 1.035-.216Z"
            />
        </Svg>
    );
};

export default MainLogoCustomComponent;
