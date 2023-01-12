import styled from 'styled-components';

export const Box = styled.div`
padding: 80px 60px;
position: absolute;
bottom: 0;
width: 100%;
color: black;

@media (max-width: 1000px) {
	padding: 70px 30px;
}
`;

export const Container = styled.div`
	display: flex;
	color: black;
	flex-direction: column;
	justify-content: center;
	max-width: 900px;
	margin: 0 auto;
	/* background: red; */
`

export const Column = styled.div`
color: black;
display: flex;
flex-direction: column;
text-align: left;
margin-top: 30px;
margin-left: 60px;
`;

export const Row = styled.div`
color: black;
display: grid;
grid-template-columns: repeat(auto-fill,
						minmax(185px, 1fr));
grid-gap: 20px;

@media (max-width: 1000px) {
	grid-template-columns: repeat(auto-fill,
						minmax(200px, 1fr));
}
`;

export const FooterLink = styled.a`
color: black;

font-size: 12px;
text-decoration: none;

&:hover {
	color: green;
	transition: 200ms ease-in;
}
`;

export const Heading = styled.p`
font-size: 20px;
color: black;
`;