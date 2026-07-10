@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthResponse login(LoginRequest request) {
        User user =
                userRepository
                        .findByEmail(
                                request.getEmail()
                        )
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Correo o contraseña incorrectos."
                                )
                        );

        if (!passwordEncoder.matches(request.getPassword(),user.getPassword())) {
            throw new RuntimeException("Correo o contraseña incorrectos.");
        }
        String token = jwtService.generateToken(user);
        return new AuthResponse(token, user.getName(), user.getEmail(), user.getPhoneNumber());
    }
}