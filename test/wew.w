import log from system.console

bottles n => (match n where
  | 0 -> 'no more bottles'
  | 1 -> '1 bottle'
  | _ -> n .. ' bottles')

#{
verse n => (match n where
  | 0 -> 'No more bottles of beer on the wall, no more bottles of beer.\n'
      .. 'Go to the store and buy some more, 99 bottles of beer on the wall.\n'
  | _ -> bottles(n) .. ' of beer on the wall, ' .. bottles(n) .. ' of beer.\n'
      .. 'Take one down and pass it around, ' .. bottles(n - 1)
      .. ' of beer on the wall.\n')

List.downfrom(99) >> List.map(verse) >> log
#}
