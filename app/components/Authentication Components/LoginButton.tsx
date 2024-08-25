
interface Props {
    toggleMenu: Function
}

function LoginButton(props: Props) {
    return (
        <button style={{ backgroundColor: '#FE2C55' }} className="hover:opacity-90 rounded text-white flex border border-gray-300 items-center px-6 py-1 text-lg font-medium text-black mr-5"
            onClick={() => { props.toggleMenu(true) }}
        >
            <p className='mr-1 '>Log in</p>
        </button>
    )
}
export default LoginButton