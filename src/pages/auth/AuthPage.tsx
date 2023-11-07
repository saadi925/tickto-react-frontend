interface AuthPageProps {
  Form: React.ReactNode;
  Image: React.ReactNode;
}

const AuthPage: React.FC<AuthPageProps> = ({ Form, Image }) => {
  return (
    <div className={`font-robo md:flex`}>
      {Form}
      {Image}
    </div>
  );
};

export default AuthPage;
