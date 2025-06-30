'use client';

import { useState } from 'react';

import Link from 'next/link';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';

const navItems = [
	{
		url: '/',
		title: '이상형 월드컵',
	},
	{
		url: '/problems/create',
		title: '이상형 월드컵 만들기 ',
	},
];

export default function NavBarClient() {
	const [showOffcanvas, setShowOffcanvas] = useState(false);

	const handleNavItemClick = () => {
		setShowOffcanvas(false);
	};

	return (
		<>
			{['lg'].map((expand) => (
				<Navbar key={expand} expand={expand} className="bg-body-tertiary">
					<Container fluid>
						<Navbar.Brand
							style={{ paddingLeft: '4em', paddingRight: '4em' }}
							href="/"
						>
							도파민
						</Navbar.Brand>
						<Navbar.Toggle
							aria-controls={`offcanvasNavbar-expand-${expand}`}
							onClick={() => setShowOffcanvas(true)}
						/>
						<Navbar.Offcanvas
							id={`offcanvasNavbar-expand-${expand}`}
							aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
							placement="end"
							show={showOffcanvas}
							onHide={() => setShowOffcanvas(false)}
						>
							<Offcanvas.Header closeButton>
								<Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
									Offcanvas
								</Offcanvas.Title>
							</Offcanvas.Header>
							<Offcanvas.Body>
								<Nav className="justify-content-start flex-grow-1 pe-3 ">
									{navItems.map((item) => {
										return (
											<Link
												key={item.url}
												href={item.url}
												style={{ textDecoration: 'none' }}
												onClick={handleNavItemClick}
											>
												<Nav.Link as="div" className="text-black">
													{item.title}
												</Nav.Link>
											</Link>
										);
									})}
								</Nav>
							</Offcanvas.Body>
						</Navbar.Offcanvas>
					</Container>
				</Navbar>
			))}
		</>
	);
}
