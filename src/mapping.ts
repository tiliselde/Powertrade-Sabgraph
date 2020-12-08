import { BigInt } from "@graphprotocol/graph-ts"
import {
  FuelToken,
  Approval,
  DelegateChanged,
  DelegateVotesChanged,
  NewMinter,
  Transfer
} from "../generated/FuelToken/FuelToken"
import { _Approval, _DelegateChanged, _DelegateVotesChanged,
 _Transfer } from "../generated/schema"

export function handleApproval(event: Approval): void {
  let entity = _Approval.load(event.params.amount.toHex())

  if (entity == null) {
    entity = new _Approval(event.params.amount.toHex())
    entity.count = BigInt.fromI32(0)
  }

  entity.count = entity.count + BigInt.fromI32(1)
  entity.owner = event.params.owner
  entity.spender = event.params.spender
  entity.amount = event.params.amount
  entity.save()
}

export function handleDelegateChanged(event: DelegateChanged): void {
  let entity = _DelegateChanged.load(event.params.fromDelegate.toHex())

  if (entity == null) {
    entity = new _DelegateChanged(event.params.fromDelegate.toHex())
    entity.count = BigInt.fromI32(0)
  }

  entity.count = entity.count + BigInt.fromI32(1)
  entity.delegator = event.params.delegator
  entity.fromDelegate = event.params.fromDelegate
  entity.toDelegate = event.params.toDelegate
  entity.save()
}

export function handleDelegateVotesChanged(event: DelegateVotesChanged): void {
  let entity = _DelegateVotesChanged.load(event.params.delegate.toHex())

  if (entity == null) {
    entity = new _DelegateVotesChanged(event.params.delegate.toHex())
    entity.count = BigInt.fromI32(0)
  }

  entity.count = entity.count + BigInt.fromI32(1)
  entity.delegate = event.params.delegate
  entity.previousBalance = event.params.previousBalance
  entity.newBalance = event.params.newBalance
  entity.save()
}

export function handleNewMinter(event: NewMinter): void {}

export function handleTransfer(event: Transfer): void {
  let entity = _Transfer.load(event.params.amount.toHex())

  if (entity == null) {
    entity = new _Transfer(event.params.amount.toHex())
    entity.count = BigInt.fromI32(0)
  }

  entity.count = entity.count + BigInt.fromI32(1)
  entity.from = event.params.from
  entity.to = event.params.to
  entity.amount = event.params.amount
  entity.save()
}
