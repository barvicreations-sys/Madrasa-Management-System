# Security Specification - Jamia Naqshbandia Management System

## Data Invariants
1. Only authenticated users with valid roles can access the system.
2. Admins have full read/write access to all collections.
3. Teachers can manage attendance, exams, and results.
4. Accountants can manage fee transactions.
5. All records must have a `createdAt` timestamp verified by the server.
6. IDs must be valid strings and follow a specific format.

## Roles
- `admin`: Full system access.
- `teacher`: Attendance, Students, Exams, Results.
- `accountant`: Fees, Students.

## Collections
- `/users`: Profile data including roles.
- `/students`: Main student registry.
- `/teachers`: Teacher profiles.
- `/classes`: Academic class definitions.
- `/attendance`: Daily attendance logs.
- `/fees`: Financial transactions.
- `/exams`: Examination schedules.
- `/results`: Academic performance.

## Validations
- `isValidId(id)`: String, size <= 128, alphanumeric + underscores.
- `isValidStudent(data)`: Required fields, valid types, max sizes.
- `isValidFee(data)`: Positive amounts, valid types.
