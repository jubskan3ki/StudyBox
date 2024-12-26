import Container from '~/components/common/container';
import Logo from '~/components/common/logo';
import ForgotPasswordForm from '~/components/ui/form/ForgotPasswordForm/ForgotPasswordForm';

const ForgotPasswordPage = () => {
    return (
        <>
            <div className="relative h-20">
                <Logo variant="largeIconWithTextDesktop" className="hidden md:block absolute top-8 left-8" />
            </div>

            <div className="flex flex-1 items-center justify-center min-h-[calc(100vh-5rem)]">
                <Container variant="auth-container">
                    <div className="mb-12 md:hidden">
                        <Logo variant="iconWithText" />
                    </div>

                    <ForgotPasswordForm />
                </Container>

                <div className="flex text-blue-500 hidden md:flex" />
            </div>
        </>
    );
};

export default ForgotPasswordPage;
