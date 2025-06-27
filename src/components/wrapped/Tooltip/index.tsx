import { FC } from 'react';

import { Tooltip as BootstrapTooltip } from 'react-bootstrap';

interface Props {
	message: string;
}

const Tooltip: FC<Props> = ({ message, ...props }) => {
	return <BootstrapTooltip {...props}>{message}</BootstrapTooltip>;
};

export default Tooltip;
