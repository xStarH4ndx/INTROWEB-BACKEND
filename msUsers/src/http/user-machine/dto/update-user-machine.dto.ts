import { PartialType } from '@nestjs/mapped-types';
import { CreateUserMachineDto } from './create-user-machine.dto';

export class UpdateUserMachineDto extends PartialType(CreateUserMachineDto) {}
